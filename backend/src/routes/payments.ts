import express from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
});

// Create payment intent
router.post('/create-intent', authenticate, async (req: AuthRequest, res) => {
  try {
    const { courseId } = req.body;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { instructor: true }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: req.user.id,
          courseId
        }
      }
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.price * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        courseId,
        studentId: req.user.id,
        instructorId: course.instructorId
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Webhook for payment confirmation
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']!;

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { courseId, studentId, instructorId } = paymentIntent.metadata;

      // Create enrollment
      await prisma.enrollment.create({
        data: {
          studentId,
          courseId
        }
      });

      // Create payment record
      await prisma.payment.create({
        data: {
          amount: paymentIntent.amount / 100,
          stripeId: paymentIntent.id,
          status: 'COMPLETED',
          studentId,
          courseId
        }
      });

      // Create instructor earning (70% commission)
      const instructorAmount = (paymentIntent.amount / 100) * 0.7;
      await prisma.earning.create({
        data: {
          amount: instructorAmount,
          instructorId
        }
      });
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ error: 'Webhook error' });
  }
});

export { router as paymentRoutes };
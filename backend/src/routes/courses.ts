import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all courses (public)
router.get('/', async (req, res) => {
  try {
    const { search, category, level } = req.query;

    const courses = await prisma.course.findMany({
      where: {
        status: 'PUBLISHED',
        ...(search && {
          OR: [
            { title: { contains: search as string } },
            { description: { contains: search as string } }
          ]
        }),
        ...(category && { category: category as string }),
        ...(level && { level: level as string })
      },
      include: {
        instructor: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        reviews: {
          select: {
            rating: true
          }
        },
        _count: {
          select: {
            enrollments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export { router as courseRoutes };






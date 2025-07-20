import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Estatísticas do instrutor
router.get('/stats', auth, async (req: AuthRequest, res: Response) => {
  try {
    const instructorId = req.user?.id;

    if (!instructorId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Total de cursos
    const totalCourses = await prisma.course.count({
      where: { instructorId }
    });

    // Total de alunos
    const totalStudents = await prisma.enrollment.count({
      where: {
        course: { instructorId }
      }
    });

    // Ganhos totais (mock data por enquanto)
    const totalEarnings = 2500.50;

    // Ganhos mensais (últimos 6 meses)
    const monthlyEarnings = [120, 340, 280, 450, 380, 520];

    res.json({
      totalCourses,
      totalStudents,
      totalEarnings,
      monthlyEarnings
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro do servidor' });
  }
});

// Cursos do instrutor
router.get('/courses', auth, async (req: AuthRequest, res: Response) => {
  try {
    const instructorId = req.user?.id;

    if (!instructorId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const courses = await prisma.course.findMany({
      where: { instructorId },
      include: {
        _count: {
          select: { enrollments: true }
        }
      }
    });

    res.json(courses);
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ error: 'Erro do servidor' });
  }
});

export { router as instructorRoutes };

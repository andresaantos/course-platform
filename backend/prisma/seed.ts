import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Criar usuários instrutores
  const instructor1 = await prisma.user.upsert({
    where: { email: 'joao@instructor.com' },
    update: {},
    create: {
      email: 'joao@instructor.com',
      password: await bcrypt.hash('123456', 10),
      firstName: 'João',
      lastName: 'Silva',
      role: 'INSTRUCTOR',
      bio: 'Desenvolvedor Full Stack com 8 anos de experiência'
    }
  });

  const instructor2 = await prisma.user.upsert({
    where: { email: 'maria@instructor.com' },
    update: {},
    create: {
      email: 'maria@instructor.com',
      password: await bcrypt.hash('123456', 10),
      firstName: 'Maria',
      lastName: 'Santos',
      role: 'INSTRUCTOR',
      bio: 'Especialista em Backend e DevOps'
    }
  });

  // Criar cursos
  const course1 = await prisma.course.upsert({
    where: { id: 'course-1' },
    update: {},
    create: {
      id: 'course-1',
      title: 'Fundamentos do React',
      description: 'Aprenda React do zero ao avançado com projetos práticos. Domine hooks, context, routing e muito mais!',
      price: 199.99,
      category: 'Programação',
      level: 'BEGINNER',
      status: 'PUBLISHED',
      instructorId: instructor1.id
    }
  });

  const course2 = await prisma.course.upsert({
    where: { id: 'course-2' },
    update: {},
    create: {
      id: 'course-2',
      title: 'Backend com Node.js',
      description: 'Construa APIs robustas com Node.js, Express, PostgreSQL e aprenda sobre autenticação JWT.',
      price: 249.99,
      category: 'Programação',
      level: 'INTERMEDIATE',
      status: 'PUBLISHED',
      instructorId: instructor2.id
    }
  });

  const course3 = await prisma.course.upsert({
    where: { id: 'course-3' },
    update: {},
    create: {
      id: 'course-3',
      title: 'TypeScript Avançado',
      description: 'Domine TypeScript com tipos avançados, generics, decorators e padrões de design.',
      price: 299.99,
      category: 'Programação',
      level: 'ADVANCED',
      status: 'PUBLISHED',
      instructorId: instructor1.id
    }
  });

  // Criar algumas avaliações
  const student = await prisma.user.upsert({
    where: { email: 'aluno@test.com' },
    update: {},
    create: {
      email: 'aluno@test.com',
      password: await bcrypt.hash('123456', 10),
      firstName: 'Pedro',
      lastName: 'Aluno',
      role: 'STUDENT'
    }
  });

  await prisma.review.upsert({
    where: { studentId_courseId: { studentId: student.id, courseId: course1.id } },
    update: {},
    create: {
      rating: 5,
      comment: 'Excelente curso! Muito didático.',
      studentId: student.id,
      courseId: course1.id
    }
  });

  await prisma.review.upsert({
    where: { studentId_courseId: { studentId: student.id, courseId: course2.id } },
    update: {},
    create: {
      rating: 4,
      comment: 'Muito bom, aprendi bastante sobre APIs.',
      studentId: student.id,
      courseId: course2.id
    }
  });

  console.log('✅ Seed concluído!');
  console.log('📚 Cursos criados:', { course1: course1.title, course2: course2.title, course3: course3.title });
  console.log('👨‍🏫 Instrutores:', { instructor1: instructor1.email, instructor2: instructor2.email });
  console.log('👨‍🎓 Aluno de teste:', student.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
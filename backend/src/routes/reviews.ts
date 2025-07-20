import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get reviews endpoint' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create review endpoint' });
});

export { router as reviewRoutes };
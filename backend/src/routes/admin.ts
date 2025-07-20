import { Router } from 'express';

const router = Router();

router.get('/stats', (req, res) => {
  res.json({ message: 'Admin stats endpoint' });
});

export { router as adminRoutes };
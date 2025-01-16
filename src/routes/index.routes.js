import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World from Express Server!');
});

export default router;

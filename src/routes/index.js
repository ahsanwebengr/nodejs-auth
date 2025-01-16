import express from 'express';
import indexRoute from './index.routes.js';
import authRoutes from './auth.routes.js';
import blogRoutes from './blog.routes.js';
import adminRoutes from './admin.routes.js';
import commentRoutes from './comment.routes.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '',
    route: indexRoute
  },
  {
    path: '/auth',
    route: authRoutes
  },
  {
    path: '/blogs',
    route: blogRoutes
  },
  {
    path: '/admin',
    route: adminRoutes
  },
  {
    path: '/comments',
    route: commentRoutes
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

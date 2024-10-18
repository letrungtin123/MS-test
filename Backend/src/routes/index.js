import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js'
import express from 'express';

const router = express.Router();



const rootRoutes = [
    userRoutes,
    authRoutes,
];

rootRoutes.map((route) => {
    router.use(route);
});

export default router;
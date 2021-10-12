import express from 'express';
import { response } from 'helper';
import v1 from 'routes/v1';

const router = express.Router();

// Version 1 routes
router.use('/api/v1', v1);

// Default page
router.use('/*', response.res404);

export default router;

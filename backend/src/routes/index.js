import express from 'express';
import sampleController from '../controllers/sampleController.js';

const router = express.Router();

router.get('/sample', sampleController.getSample);

export default router;
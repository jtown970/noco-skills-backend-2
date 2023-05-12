import express from "express";
import {createAppointment, getAppointments, getAppointmentsByGigId} from '../controllers/appointmentsController.js'
// const appointmentsController = require('../controllers/appointmentsController');

const router = express.Router();

router.get('/getAppointments', getAppointments);
router.post('/createAppointment', createAppointment);
router.get('/getAppointments/:gigId', getAppointmentsByGigId);


export default router;

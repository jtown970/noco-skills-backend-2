import express from 'express';
import {createEvent} from '../controllers/google.controller.js';

const router = express.Router();

// GET all appointments
// router.get('/', appointmentsController.getAllAppointments);

// POST new appointment
router.post('/', createEvent);

// GET appointment by ID
// router.get('/:id', appointmentsController.getAppointmentById);

// PUT update appointment by ID
// router.put('/:id', appointmentsController.updateAppointmentById);

// DELETE appointment by ID
// router.delete('/:id', appointmentsController.deleteAppointmentById);

export default router;

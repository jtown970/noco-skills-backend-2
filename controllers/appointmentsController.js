import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
  try {
    const { date, startTime, endTime, gigId, sellerId, buyerId } = req.body;
    const appointment = new Appointment({ date, startTime, endTime, gigId, sellerId, buyerId });
    await appointment.save();
    res.status(201).send(appointment);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).send(appointments);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAppointmentsByGigId = async (req, res) => {
  try {
    const { gigId } = req.params;
    const appointments = await Appointment.find({ gigId});
    res.status(200).send(appointments);
  } catch (err) {
    res.status(500).send(err);
  }
};




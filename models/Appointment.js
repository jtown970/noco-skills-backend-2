import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new mongoose.Schema({
  date: { 
    type: String, 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
  gigId: { 
    type: String, 
    required: false 
  },
  sellerId: { 
    type: String, 
    required: false 
  },
  buyerId: { 
    type: String, 
    required: false 
  },
});

export default mongoose.model('Appointment', appointmentSchema);

// module.exports = Appointment;

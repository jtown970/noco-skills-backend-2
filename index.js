import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";  
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import appointmentsRoute from "./routes/appointments.js";
import googleRoute from "./routes/google.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {google} from 'googleapis';
import axios from "axios";


const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try{
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log('mongo connect fail err =>',error);
  }
}


// testing cors change
const allowedOrigins = [
  'https://noco-skills-backend.adaptable.app',
  'https://noco-skills-frontend.onrender.com',
  'https://stupendous-bienenstitch-688288.netlify.app',
  'https://nocoskills.com',
  'https://www.nocoskills.com'
]

const corsOptions = {
  origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true)
      } else {
          callback(new Error('Not allowed by CORS'))
      }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/appointments", appointmentsRoute);
app.use("/api/google", googleRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

const port = process.env.PORT || 8001;
app.listen(port, () => {
  connect();
  console.log(`backend server is running! port: ${port}`);
}); 







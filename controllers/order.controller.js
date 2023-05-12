import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";
import express from "express";
const app = express();

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  // Access the totalPrice from the request
  const totalPrice = req.query.totalPrice;
  console.log('totalPrice:', totalPrice);

  // Calculate the amount based on the totalPrice
  const amount = Math.ceil(totalPrice * 100);
  console.log('amount:', amount);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: totalPrice,
    payment_intent: paymentIntent.id,
    selectedDate: gig.selectedDate,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};

export const refund = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE);
    const order = await Order.findOne({
      payment_intent: req.body.payment_intent,
    });
    if (!order) {
      throw createError(404, "Order not found.");
    }
    const refund = await stripe.refunds.create({
      payment_intent: req.body.payment_intent,
      amount: order.price * 100,
    });
    res.status(200).send({ message: "Refund created.", refund });
  } catch (err) {
    next(err);
  }
};

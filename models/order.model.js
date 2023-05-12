import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    selectedDate: {
      type: String,
      required: false,
    },
    buyerId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
    refund: {
      type: Schema.Types.ObjectId,
      ref: "Refund",
    },
  },
  {
    timestamps: true,
  }
);

const RefundSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    amount: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Refund = mongoose.model("Refund", RefundSchema);
export default mongoose.model("Order", OrderSchema);
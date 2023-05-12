import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    // sellerId: {
    //   type: String,
    //   required: true,
    // },
    // buyerId: {
    //   type: String,
    //   required: true,
    // },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // reference to the User schema
      required: false,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // reference to the User schema
      required: false,
    },
    readBySeller: {
      type: Boolean,
      required: true,
    },
    readByBuyer: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);
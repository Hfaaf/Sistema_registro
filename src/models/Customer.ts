import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
    name: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    initialValue: { type: Number, required: true },
    finalValue: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model("Customer", customerSchema);
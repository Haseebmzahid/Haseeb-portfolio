import mongoose, { Schema, type Document, type Model } from "mongoose";

/* ─────────────────────────────────────────────
   Interface
   ───────────────────────────────────────────── */
export interface IContact extends Document {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

/* ─────────────────────────────────────────────
   Schema
   ───────────────────────────────────────────── */
const ContactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [100, "Name cannot exceed 100 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            maxlength: [254, "Email cannot exceed 254 characters"],
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
            minlength: [10, "Message must be at least 10 characters"],
            maxlength: [2000, "Message cannot exceed 2000 characters"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true, // prevent accidental overwrites
        },
    },
    {
        timestamps: false, // we manage createdAt manually above
        versionKey: false, // remove __v field
    }
);

/* ─────────────────────────────────────────────
   Model  (HMR-safe singleton)
   ───────────────────────────────────────────── */
const Contact: Model<IContact> =
    mongoose.models.Contact ??
    mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;

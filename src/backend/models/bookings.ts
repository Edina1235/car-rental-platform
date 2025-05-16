import mongoose from "mongoose";

export interface Bookings {
  userId: string,
  vehicleId: string,
  startDate: Date
  endDate: Date
  createdAt: Date
  totalPrice: Number,
  status: string,
  extraServiceIds: string[],
}

export const bookingsSchema = new mongoose.Schema({
  userId: String,
  vehicleId: String,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  totalPrice: Number,
  status: String,
  extraServiceIds: [String],
}, { _id: true });

export const BookingsModel = mongoose.model('Bookings', bookingsSchema);
import mongoose from "mongoose";

export interface Vehicle {
  brand: string,
  model: string,
  dailyRate: number,
  images: string[],
  createdAt?: Date,
}

export const vehicleSchema = new mongoose.Schema({
  brand: String,
  model: String,
  dailyRate: Number,
  images: [String],
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

export const VehicleModel = mongoose.model('Vehicle', vehicleSchema);
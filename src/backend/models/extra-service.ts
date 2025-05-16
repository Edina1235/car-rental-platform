import mongoose from "mongoose";

export interface ExtraService {
  name: string,
  description: string,
  pricePerDay: number
}

const extraServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  pricePerDay: Number
}, { _id: true });

export const ExtraServiceModel = mongoose.model('ExtraService', extraServiceSchema);
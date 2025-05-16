import mongoose from "mongoose";

export interface VehicleAvailability {
  vehicleId: string,
  reservations: Reservation
}

export interface Reservation {
  reservedFrom: Date;
  reservedTo: Date;
}

export const ReservationSchema = new mongoose.Schema({
  reservedFrom: { type: Date, default: Date.now },
  reservedTo: { type: Date, default: Date.now }
}, { _id: false });

export const vehicleAvailabilitySchema = new mongoose.Schema({
  vehicleId: String,
  reservations: [ReservationSchema]
}, { _id: true });

export const VehicleAvailabilityModel = mongoose.model('VehicleAvailability', vehicleAvailabilitySchema);
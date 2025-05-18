export interface VehicleAvailability {
  _id?: string,
  vehicleId: string,
  reservations: Reservation
}

export interface Reservation {
  reservedFrom: Date;
  reservedTo: Date;
}
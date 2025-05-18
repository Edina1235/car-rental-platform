export interface Bookings {
  _id?: string,
  userId: string,
  vehicleId: string,
  startDate: string,
  endDate: string,
  createdAt: string,
  totalPrice: Number,
  status: string,
  extraServiceIds: string[],
}

export enum Status {
  Expired = "Expired",
  AwaitingPayment = "Awaiting Payment",
  Paid = "Paid"
}
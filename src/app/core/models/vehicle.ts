export interface Vehicle {
  _id?: string,
  brand: string,
  model: string,
  dailyRate: number,
  images: string[],
  createdAt?: Date,
}
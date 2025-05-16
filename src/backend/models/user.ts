import mongoose from "mongoose";

export enum Role {
  Admin = "admin",
  User = "user"
}

export interface User {
  name: string
  email: string
  passwordHash: string
  role: Role
  createdAt?: Date
  _id?: string
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

export const UserModel = mongoose.model('User', userSchema);
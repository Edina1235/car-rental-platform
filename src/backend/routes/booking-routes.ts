import { Router } from "express";
import { Bookings, BookingsModel } from '../models';
import mongoose from 'mongoose';


export const configureBookingRoutes = (router: Router): Router => {

  router.get('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        const booking = await BookingsModel.findOne({ _id: req.params.id });
        if (!booking) {
          res.status(404).send('Booking not found');
        }
        res.json(booking);
      } catch (e) {
        console.log(e)
      }
    }
  });

  router.get('/user/:userId', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        const bookings = await BookingsModel.find({ userId: req.params.userId });
        if (!bookings) {
          res.status(404).send('Bookings for User not found');
        }
        res.json(bookings);
      } catch (e) {
        console.log(e)
      }
    }
  });

  router.get('/vehicle/:vehicleId', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        const bookings = await BookingsModel.find({ vehicleId: req.params.vehicleId });
        if (!bookings) {
          res.status(404).send('Bookings for a vehicle not found');
        }
        res.json(bookings);
      } catch (e) {
        console.log(e)
      }
    }
  });

  router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        const bookings = await BookingsModel.find({});
        res.json(bookings);
      } catch (e) {
        console.log(e)
      }
    }
  });

  router.put('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        if (!req.params.id || !req.body) {
          console.log("Bad body or params");
          res.sendStatus(400)
        }

        const newBooking: Bookings = {
          ...req.body
        }

        const original = await BookingsModel.findOneAndUpdate({ _id: req.params.id }, newBooking, { returnOriginal: true });

        if (!original) {
          console.log("Update failed for booking")
          res.sendStatus(404);
        }

        console.log("Booking updated")
        res.sendStatus(200);
      } catch (e) {
        console.log(e)
        res.sendStatus(400)
      }
    }
  });

  router.delete('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        if (!req.params.id) {
          console.log("Bad params");
          res.sendStatus(400)
        }
        const deletableBooking = await BookingsModel.findById(req.params.id);
        if (!deletableBooking) {
          console.log("There is no booking to delete")
          res.sendStatus(400)
        }
        await BookingsModel.deleteOne({
          _id: new mongoose.Types.ObjectId(req.params.id)
        });
        console.log("Booking deleted")
        res.sendStatus(204);
      } catch (e) {
        console.log(e)
        res.sendStatus(400)
      }
    }
  });

  router.post('/', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        if (!req.body) {
          console.log("Bad request body");
          res.sendStatus(400)
        }
        const booking: Bookings = {
          ...req.body
        }
        await BookingsModel.insertOne(booking);
        console.log("Booking created")
        res.sendStatus(201);
      } catch (e) {
        console.log(e)
        res.sendStatus(400)
      }
    }
  });

  return router;
}
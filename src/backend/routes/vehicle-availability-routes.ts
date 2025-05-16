import { Router } from "express";
import { VehicleAvailability, VehicleAvailabilityModel } from '../models';
import mongoose from 'mongoose';


export const configureAvailabilityRoutes = (router: Router): Router => {

  router.get('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        const availability = await VehicleAvailabilityModel.findOne({ _id: req.params.id });
        if (!availability) {
          res.status(404).send('Availability not found');
        }
        res.json(availability);
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
        const availability = await VehicleAvailabilityModel.find({ vehicleId: req.params.vehicleId });
        if (!availability) {
          res.status(404).send('Availability for a vehicle not found');
        }
        res.json(availability);
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
        const availabilities = await VehicleAvailabilityModel.find({});
        res.json(availabilities);
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

        const newAvailability: VehicleAvailability = {
          vehicleId: req.body.vehicleId,
          reservations: {
            reservedFrom: req.body.reservedFrom,
            reservedTo: req.body.reservedTo
          }
        }

        const original = await VehicleAvailabilityModel.findOneAndUpdate({ _id: req.params.id }, newAvailability, { returnOriginal: true });

        if (!original) {
          console.log("Update failed for booking")
          res.sendStatus(404);
        }

        console.log("VehicleAvailability updated")
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
        const deletableAvailability = await VehicleAvailabilityModel.findById(req.params.id);
        if (!deletableAvailability) {
          console.log("There is no booking to delete")
          res.sendStatus(400)
        }
        await VehicleAvailabilityModel.deleteOne({
          _id: new mongoose.Types.ObjectId(req.params.id)
        });
        console.log("VehicleAvailability deleted")
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
        const booking: VehicleAvailability = {
          vehicleId: req.body.vehicleId,
          reservations: {
            reservedFrom: req.body.reservedFrom,
            reservedTo: req.body.reservedTo
          }
        }
        await VehicleAvailabilityModel.insertOne(booking);
        console.log("VehicleAvailability created")
        res.sendStatus(201);
      } catch (e) {
        console.log(e)
        res.sendStatus(400)
      }
    }
  });

  return router;
}
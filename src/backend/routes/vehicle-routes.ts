import { Router } from "express";
import { Role, User, Vehicle, VehicleModel } from '../models';
import mongoose from 'mongoose';


export const configureVehicleRoutes = (router: Router): Router => {

  router.get('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        const vehicle = await VehicleModel.findOne({ _id: req.params.id });
        if (!vehicle) {
          res.status(404).send('Vehicle not found');
        }
        res.json(vehicle);
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
        const vehicles = await VehicleModel.find({});
        res.json(vehicles);
      } catch (e) {
        console.log(e)
      }
    }
  });

  router.put('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else if ((req.user as User).role === Role.Admin) {
      try {
        if (!req.params.id || !req.body) {
          console.log("Bad body or params");
          res.sendStatus(400)
        }

        const newVehicle: Vehicle = {
          ...req.body
        }

        const original = await VehicleModel.findOneAndUpdate({ _id: req.params.id }, newVehicle, { returnOriginal: true });

        if (!original) {
          console.log("Update failed for vehicle")
          res.sendStatus(404);
        }

        console.log("Vehicle updated")
        res.sendStatus(200);
      } catch (e) {
        console.log(e)
        res.sendStatus(400)
      }
    } else {
      res.status(403).send('User does not have the required role');
    }
  });

  router.delete('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else if ((req.user as User).role === Role.Admin) {
      try {
        if (!req.params.id) {
          console.log("Bad params");
          res.sendStatus(400)
        }
        const deletableVehivle = await VehicleModel.findById(req.params.id);
        if (!deletableVehivle) {
          console.log("There is no vehicle to delete")
          res.sendStatus(400)
        }
        await VehicleModel.deleteOne({
          _id: new mongoose.Types.ObjectId(req.params.id)
        });
        console.log("Vehicle deleted")
        res.sendStatus(204);
      } catch (e) {
        console.log(e)
        res.sendStatus(400)
      }
    } else {
      res.status(403).send('User does not have the required role');
    }
  });


  router.post('/', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else if ((req.user as User).role === Role.Admin) {
      try {
        if (!req.body) {
          console.log("Bad request body");
          res.sendStatus(400)
        }
        const vehicle: Vehicle = {
          ...req.body
        }
        console.log(vehicle);
        await VehicleModel.insertOne(vehicle);
        console.log("Vehicle created")
        res.sendStatus(201);
      } catch (e) {
        console.log(e)
        res.sendStatus(400)
      }
    } else {
      res.status(403).send('User does not have the required role');
    }
  });

  return router;
}
import { Router } from "express";
import { ExtraService, ExtraServiceModel, Role, User } from '../models';

import mongoose from 'mongoose';


export const configureExtraServiceRoutes = (router: Router): Router => {

  router.get('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        const extraService = await ExtraServiceModel.findOne({ _id: req.params.id });
        if (!extraService) {
          res.status(404).send('Extra Service not found');
        }
        res.json(extraService);
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
        const extras = await ExtraServiceModel.find({});
        res.json(extras);
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

        const newExtraService: ExtraService = {
          ...req.body
        }

        const original = await ExtraServiceModel.findOneAndUpdate({ _id: req.params.id }, newExtraService, { returnOriginal: true });

        if (!original) {
          console.log("Update failed for extraService")
          res.sendStatus(404);
        }

        console.log("ExtraService updated")
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
        const deletableExtraService = await ExtraServiceModel.findById(req.params.id);
        if (!deletableExtraService) {
          console.log("There is no ExtraService to delete")
          res.sendStatus(400)
        }
        await ExtraServiceModel.deleteOne({
          _id: new mongoose.Types.ObjectId(req.params.id)
        });
        console.log("ExtraService deleted")
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
        const extraService: ExtraService = {
          ...req.body
        }
        await ExtraServiceModel.insertOne(extraService);
        console.log("ExtraService created")
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
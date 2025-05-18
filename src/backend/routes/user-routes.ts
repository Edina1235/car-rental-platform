import { Router } from "express";
import { Role, User, UserModel } from '../models';
import mongoose from 'mongoose';


export const configureUserRoutes = (router: Router): Router => {

  

  router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else if ((req.user as User).role === Role.Admin) {
      try {
        const users = await UserModel.find({});
        res.json(users);
      } catch (e) {
        console.log(e)
      }
    } else {
      res.status(403).send('User does not have the required role');
    }
  });

  router.get('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      try {
        const user = await UserModel.findOne({ _id: req.params.id });
        if (!user) {
          res.status(404).send('User not found');
        }
        res.json(user);
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
        if (((req.user as User)._id !== req.params.id) && (req.user as User).role !== Role.Admin) {
          res.status(403).send('User tries to update another user, which is forbidden');
        }
        const newUser: User = {
          ...req.body
        }

        const original = await UserModel.findOneAndUpdate({ _id: req.params.id }, newUser, { returnOriginal: true });

        if (!original) {
          console.log("Update failed for user")
          res.sendStatus(404);
        }

        console.log("User updated")
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
        if (((req.user as User)._id !== req.params.id) && (req.user as User).role !== Role.Admin) {
          res.status(403).send('User tries to delete another user, which is forbidden');
        }
        const deletableUser = await UserModel.findById(req.params.id);
        if (!deletableUser) {
          console.log("There is no user to delete")
          res.sendStatus(400)
        }
        await UserModel.deleteOne({
          _id: new mongoose.Types.ObjectId(req.params.id)
        });
        console.log("User deleted")
        res.sendStatus(204);
      } catch (e) {
        console.log(e)
        res.sendStatus(400)
      }
    }
  });

  return router;
}
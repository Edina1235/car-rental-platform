import { NextFunction, Router } from "express";
import { PassportStatic } from "passport";
import { User, UserModel } from '../models';
import { Bcrypt } from '../utils';



export const configureAuthRoutes = (passport: PassportStatic, router: Router): Router => {

  router.post('/register', async (req, res) => {
    try {
      if (!req.body) {
        console.log("Bad request body");
        res.sendStatus(400)
      }
      const userRequest: User = {
        ...req.body
      }
      const user = await UserModel.findOne({ email: userRequest.email })
      if (user) {
        res.sendStatus(400)
      }
      userRequest.passwordHash = Bcrypt.hashPassword(userRequest.passwordHash)
      await UserModel.insertOne(userRequest)
      console.log("User created with email: " + userRequest.email)
      res.sendStatus(201);

    } catch (e) {
      console.log(e)
      res.sendStatus(400)
    }
  })


  router.post('/login', (req, res, next: NextFunction) => {
    passport.authenticate('local', (error: string | null, user: User) => {
      if (error) {
        res.status(500).send(error);
      } else {
        req.login(user, (err: string | null) => {
          if (err) {
            console.log(err);
            res.status(500).send('Internal server error.');
          } else {
            res.status(200).send(user);
          }
        });
      }
    })(req, res, next);
  });

  router.post('/logout', (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(500).send('User is not logged in.');
    } else {
      req.logout((error) => {
        if (error) {
          console.log(error);
          res.status(500).send('Internal server error.');
        }
        res.status(200).send('Successfully logged out.');
      })
    }
  });

  return router;
}
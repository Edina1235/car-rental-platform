import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import { User, UserModel } from '../models';
import { Bcrypt } from './bcrypt';

export const configurePassport = (passport: PassportStatic): PassportStatic => {

  passport.serializeUser((user: Express.User, done: any) => {
    console.log('user is serialized.');
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done: any) => {
    console.log('user is deserialized.');
    done(null, user);
  });

  passport.use('local', new Strategy(async (username: string, password: string, done: any) => {
    const user: User | null = await UserModel.findOne({ email: username })
    console.log(user)
    if (!user) {
      done('Incorrect username or password.');

    } else if (!Bcrypt.comparePassword(user.passwordHash, password)) {
      return done('Incorrect password.', false);
    }
    return done(null, user);
  }));

  return passport;
}
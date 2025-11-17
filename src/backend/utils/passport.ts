import { PassportStatic } from 'passport';
import { Strategy, VerifyFunction } from 'passport-local';
import { User, UserModel } from '../models';
import { Bcrypt } from './bcrypt';

type Done = Parameters<VerifyFunction>[2];

export const configurePassport = (passport: PassportStatic): PassportStatic => {

  passport.serializeUser((user: Express.User, done: (err: Error | null, id?: Express.User) => void) => {
    console.log('user is serialized.');
    done(null, user);
  });

  passport.deserializeUser((user: Express.User,  done: (err: Error | null, user?: Express.User | false | null) => void) => {
    console.log('user is deserialized.');
    done(null, user);
  });

  passport.use('local', new Strategy(async (username: string, password: string, done: Done) => {
    const user: User | null = await UserModel.findOne({ email: username })
    if (!user) {
      done('Incorrect username or password.');

    } else if (!Bcrypt.comparePassword(user.passwordHash, password)) {
      return done('Incorrect password.', false);
    }
    return done(null, user ?? undefined);
  }));

  return passport;
}
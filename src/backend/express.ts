import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import expressSession from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { configureAuthRoutes, configureAvailabilityRoutes, configureBookingRoutes, configureExtraServiceRoutes, configureUserRoutes, configureVehicleRoutes } from './routes';
import { configurePassport } from './utils';

const app = express();
app.use(cors({
  origin: 'http://localhost:4200', // vagy '*', ha mindenkit engedsz (fejlesztéshez)
  credentials: true // ha cookie-t vagy session-t is használsz
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const sessionOptions: expressSession.SessionOptions = {
  secret: 'randomSecretHEHE',
  resave: false,
  saveUninitialized: false
};
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/', configureAuthRoutes(passport, express.Router()));
app.use('/vehicles', configureVehicleRoutes(express.Router()));
app.use('/user', configureUserRoutes(express.Router()));
app.use('/extra-service', configureExtraServiceRoutes(express.Router()));
app.use('/bookings', configureBookingRoutes(express.Router()));
app.use('/availability', configureAvailabilityRoutes(express.Router()));

app.listen(3000, () => console.log('Server is running on port 3000'));

// MongoDB Atlas URI
const uri = 'mongodb+srv://carRental:carRental123@cluster0.stbcjzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, {
  dbName: "carRental"
} as ConnectOptions)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


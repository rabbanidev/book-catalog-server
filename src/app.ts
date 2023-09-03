import cors from 'cors';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import notFoundHandler from './app/middlewares/notFoundHandler';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import Routes from './app/routes';
import sendResponse from './shared/sendResponse';
import httpStatus from 'http-status';

const app: Application = express();

// cors use
app.use(cors());
app.use(cookieParser());

// parser use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aplication routes
app.use('/api/v1', Routes);

// Root Route
app.get('/', (req, res) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wellcome to book catalog server',
  });
});

// Global Error Hnadler
app.use(globalErrorHandler);

// Not Found Handler
app.use(notFoundHandler);

export default app;

import { Response } from 'express';

type ISendResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    size: number;
    total: number;
  };
  data?: T | null;
  token?: string | undefined;
};

const sendResponse = <T>(res: Response, payload: ISendResponse<T>): void => {
  const responseData: ISendResponse<T> = {
    success: payload.success,
    statusCode: payload.statusCode,
    message: payload.message || null,
    meta: payload.meta || null || undefined,
    data: payload.data,
    token: payload.token,
  };

  res.status(payload.statusCode).json(responseData);
};

export default sendResponse;

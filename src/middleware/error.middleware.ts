import { Request, Response, NextFunction } from "express";
import {
  InvalidTokenError,
  UnauthorizedError,
  InsufficientScopeError,
} from "express-oauth2-jwt-bearer";

import { PermissionDenied } from "./openfga.middleware";
import mongoose from "mongoose";

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(error);

  if (error instanceof InsufficientScopeError) {
    const message = "Permission denied";

    response.status(error.status).json({ message });

    return;
  }

  if (error instanceof InvalidTokenError) {
    const message = "Bad credentials";

    response.status(error.status).json({ message });

    return;
  }

  if (error instanceof UnauthorizedError) {
    const message = "Requires authentication";

    response.status(error.status).json({ message });

    return;
  }

  if (error instanceof PermissionDenied) {
    const message = "Permission denied";

    response.status(403).json({ message });

    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const message = "Bad Request";

    response.status(400).json({ message });

    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    console.log("handle ValidationError");
    const message = "Bad Request";

    response.status(400).json({ message });

    return;
  }

  const status = 500;
  const message = "Internal Server Error";

  response.status(status).json({ message });
};

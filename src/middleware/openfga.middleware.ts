import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { OpenFgaClient } from '@openfga/sdk';

dotenv.config();

export class PermissionDenied extends Error {
  constructor(message: string) {
    super(message)
  }
}

const fgaClient = new OpenFgaClient({
  apiUrl: process.env.FGA_API_URL, // required
  storeId: process.env.FGA_STORE_ID, // not needed when calling `CreateStore` or `ListStores`
  authorizationModelId: process.env.FGA_MODEL_ID, // Optional, can be overridden per request
});


export const checkRequiredPermissions = (requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fgaClient.check({
        user: "user:jimena",
        object: "team:superadmin",
        relation: "member",
      });

      console.log(result.allowed);

      if (!result.allowed) {
        next(new PermissionDenied('Permission denied'));
      }

      console.log("Permission check passed");
      next();
    } catch (error) {
      next(error);
    }
  };

}


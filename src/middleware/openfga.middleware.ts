import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { ClientCheckRequest, OpenFgaClient } from "@openfga/sdk";

dotenv.config();

export class PermissionDenied extends Error {
  constructor(message: string) {
    super(message);
  }
}

const fgaClient = new OpenFgaClient({
  apiUrl: process.env.FGA_API_URL, // required
  storeId: process.env.FGA_STORE_ID, // not needed when calling `CreateStore` or `ListStores`
  authorizationModelId: process.env.FGA_MODEL_ID, // Optional, can be overridden per request
});

export const getPermission = (req: Request): ClientCheckRequest => {
  const userId = req.auth?.payload.sub;
  const tuple = {
    user: `user:${userId}`,
    object: `document:${req.params.id}`,
    relation: "viewer",
  };
  return tuple;
};

export const updatePermission = (req: Request): ClientCheckRequest => {
  const userId = req.auth?.payload.sub;
  const tuple = {
    user: `user:${userId}`,
    object: `document:${req.params.id}`,
    relation: "writer",
  };
  return tuple;
};

export const deletePermission = (req: Request): ClientCheckRequest => {
  const userId = req.auth?.payload.sub;
  const tuple = {
    user: `user:${userId}`,
    object: `document:${req.params.id}`,
    relation: "owner",
  };
  return tuple;
};

export const createPermission = (req: Request): ClientCheckRequest | null => {
  const userId = req.auth?.payload.sub;
  const parentId = req.body.parentId;
  const tuple = parentId
    ? {
        user: `user:${userId}`,
        object: `document:${parentId}`,
        relation: "writer",
      }
    : null;
  return tuple;
};

export const checkRequiredPermissions = (
  permission: (req: Request) => ClientCheckRequest | null
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tuple = permission(req);

      console.log("tuple", tuple);

      if (!tuple) {
        next();
        return;
      }
      const result = await fgaClient.check(tuple);

      if (!result.allowed) {
        next(new PermissionDenied("Permission denied"));
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

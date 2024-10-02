import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";
import { checkRequiredPermissions } from "../middleware/openfga.middleware";
import {
  deleteDocumentById,
  findDocumentById,
  getAllDocuments,
  saveDocument,
  updateDocument,
} from "./document.service";

export const documentRouter = express.Router();

documentRouter.get(
  "/",
  //validateAccessToken,
  async (req, res, next) => {
    try {
      const documents = await getAllDocuments();
      res.status(200).json(documents);
    } catch (error) {
      next(error);
    }
  }
);

documentRouter.post(
  "/",
  //validateAccessToken,
  //checkRequiredPermissions(["member", "team:admin"]),
  async (req, res, next) => {
    try {
      const document = await saveDocument(req.body);
      res.status(200).json(document);
    } catch (error) {
      next(error);
    }
  }
);

documentRouter.put(
  "/:id",
  //validateAccessToken,
  //checkRequiredPermissions(["member", "team:admin"]),
  async (req, res, next) => {
    try {
      const document = await updateDocument(req.params.id, req.body);
      if (!document) {
        res.status(404).json({ message: "Document not found" });
        return;
      }
      res.status(200).json(document);
    } catch (error) {
      next(error);
    }
  }
);

documentRouter.delete(
  "/:id",
  //validateAccessToken,
  //checkRequiredPermissions(["member", "team:admin"]),
  async (req, res, next) => {
    try {
      const document = await deleteDocumentById(req.params.id);
      if (!document) {
        res.status(404).json({ message: "Document not found" });
        return;
      }
      res.status(200);
    } catch (error) {
      next(error);
    }
  }
);

documentRouter.get(
  "/:id",
  //validateAccessToken,
  async (req, res, next) => {
    try {
      const document = await findDocumentById(req.params.id);
      if (!document) {
        res.status(404).json({ message: "Document not found" });
        return;
      }
      res.status(200).json(document);
    } catch (error) {
      next(error);
    }
  }
);

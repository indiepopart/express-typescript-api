import { model, Schema } from "mongoose";

export interface Document {
  id: string;
  ownerId: string;
  parentId: string;
  name: string;
  description: string;
  createdTime: Date;
  modifiedTime: Date;
  quotaBytesUsed: number;
  version: number;
  originalFilename: string;
  fileExtension: string;
}

const documentSchema = new Schema<Document>({
  ownerId: { type: String },
  parentId: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  createdTime: { type: Date },
  modifiedTime: { type: Date },
  quotaBytesUsed: { type: Number },
  version: { type: Number },
  originalFilename: { type: String },
  fileExtension: { type: String },
});

export const DocumentModel = model<Document>("Document", documentSchema);

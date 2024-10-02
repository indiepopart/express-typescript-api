import { Document } from "./document.model";
import { DocumentModel } from "./document.model";

export class DocumentServiceError extends Error {
  constructor(message: any) {
    super(message);
  }
}

export const saveDocument = async (document: Document): Promise<Document> => {
  const model = new DocumentModel({ ...document });
  const saved = await model.save();
  return saved;
};

export const findDocumentById = async (
  documentId: string
): Promise<Document | null> => {
  const document = await DocumentModel.findById(documentId);
  return document;
};

export const updateDocument = async (
  documentId: string,
  document: Document
): Promise<Document | null> => {
  const updated = await DocumentModel.findByIdAndUpdate(documentId, document);
  return updated;
};

export const getAllDocuments = async (): Promise<Document[]> => {
  const documents = await DocumentModel.find().exec();
  return documents;
};

export const deleteDocumentById = async (
  documentId: string
): Promise<Document | null> => {
  const document = await DocumentModel.findByIdAndDelete(documentId);
  return document;
};

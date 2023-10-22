import mongoose, { Document, Model, Schema } from 'mongoose';

export interface UrlDocument {
    alias: string;
    fullUrl: string;
}

const urlSchema = new Schema({
    alias: { type: String, required: true, unique: true },
    fullUrl: { type: String, required: true },
});

export const UrlModel: Model<UrlDocument> = mongoose.model('Url', urlSchema);

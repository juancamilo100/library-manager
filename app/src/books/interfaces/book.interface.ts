// src/books/interfaces/book.interface.ts
import { Document } from 'mongoose';

export interface Book extends Document {
  title: string;
  author: string;
  description: string;
  year: number;
}

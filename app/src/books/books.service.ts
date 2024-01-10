// src/books/books.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './interfaces/book.interface'

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) {}

  async findAll(page: number, pageSize: number): Promise<{count: number, books: Book[]}> {
    const skip = (page - 1) * pageSize;
    const count = await this.bookModel.find().count();
    const books = await this.bookModel.find().skip(skip).limit(pageSize).exec();
    return {
        books,
        count,
    }
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async create(book: Book): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return createdBook.save();
  }

  async update(id: string, book: Book): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.bookModel.findByIdAndDelete(id).exec();
  }
}

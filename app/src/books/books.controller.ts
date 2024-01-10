// src/books/books.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{count: number, books: Book[]}> {
    return this.booksService.findAll(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book | undefined> {
    return this.booksService.findOne(id);
  }

  @Post('many')
  async createMany(@Body() books: Book[]): Promise<void> {
    console.log('book', books);

    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      await this.booksService.create(book);
    }

    return;
  }

  @Post()
  async create(@Body() book: Book): Promise<Book> {
    console.log('book', book);

    return this.booksService.create(book);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() book: Book,
  ): Promise<Book | undefined> {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}

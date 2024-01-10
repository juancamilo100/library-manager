import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { MyJwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/demo_db'), BooksModule, MyJwtModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

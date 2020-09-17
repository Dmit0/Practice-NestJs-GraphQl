import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import {AuthModule} from './Auth/authmodule';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://new_user:12345678d@cluster0.xhhec.mongodb.net/UnitTestsPractice?retryWrites=true&w=majority'),
    GraphQLModule.forRoot({
      autoSchemaFile:'src/schema.gql',
    }),
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {UserModule} from './Auth/usermodule';
import { MongooseModule } from '@nestjs/mongoose';
import {BookModule}from './DataBook/bookmodule'

@Module({
  imports: [
    UserModule,
    BookModule,
    MongooseModule.forRoot('mongodb+srv://new_user:12345678d@cluster0.xhhec.mongodb.net/UnitTestsPractice?retryWrites=true&w=majority'),
    GraphQLModule.forRoot({
      autoSchemaFile:'src/schema.gql',
      context: ({ req }) => ({ req }),
    }),
  ],
})
export class AppModule {}

require('dotenv').config();
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DateScalar } from './graphql/scalars/date.scalar';
import { AccountsModule } from './modules/account.module';
import { AuthModule } from './modules/auth.module';
import { InviteModule } from './modules/invite.module';
import { OccasionModule } from './modules/occasion.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
      cors: {
        origin: ['http://localhost:3000', 'https://faec-108-29-6-138.ngrok.io'],
        credentials: true,
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      context: ({ req }) => {
        return req;
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AccountsModule,
    AuthModule,
    InviteModule,
    OccasionModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}

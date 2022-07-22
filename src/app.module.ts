import { UploadFileMiddleware } from './middlewares/upload-file-middleware';
import { MailModule } from './mail/mail.module';
import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule} from "@nestjs/typeorm";
import {ormconfig} from './configs/ormconfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RecordModule } from './record/record.module';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync(ormconfig),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
    UserModule,
    AuthModule, 
    MailModule, 
    RecordModule
  ],
  controllers: [],
  providers: [],
  exports: [MulterModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UploadFileMiddleware)
      .forRoutes({ path: 'record/:id', method: RequestMethod.PATCH })
  }
}

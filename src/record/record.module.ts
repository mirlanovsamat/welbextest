import { UserModule } from './../user/user.module';
import { RecordEntity } from './entities/record.entity';
import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecordEntity]),
    UserModule
  ],
  controllers: [RecordController],
  providers: [RecordService]
})
export class RecordModule {}

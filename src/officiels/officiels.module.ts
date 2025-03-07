import { Module } from '@nestjs/common';
import { OfficielsController } from './officiels.controller';
import { OfficielsService } from './officiels.service';

@Module({
  controllers: [OfficielsController],
  providers: [OfficielsService]
})
export class OfficielsModule {}

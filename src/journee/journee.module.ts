import { Module } from '@nestjs/common';
import { JourneeController } from './journee.controller';
import { JourneeService } from './journee.service';

@Module({
  controllers: [JourneeController],
  providers: [JourneeService]
})
export class JourneeModule {}

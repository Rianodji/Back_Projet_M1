// html-sanitizer.module.ts
import { Module } from '@nestjs/common';
import { SanitizerService } from './sanitizer.service';

@Module({
  providers: [SanitizerService],
  exports: [SanitizerService],  // Exporte le service pour d'autres modules
})
export class SanitizerModule {}
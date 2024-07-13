import { Module } from '@nestjs/common';
import { TranscriptionGateway } from './transcription.gateway';
import { TranscriptionService } from './transcription.service';

@Module({
  providers: [TranscriptionGateway, TranscriptionService],
})
export class TranscriptionModule {}

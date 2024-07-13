import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Writer as WavWriter } from 'wav';

import { TranscriptionService } from './transcription.service';
import { PassThrough } from 'node:stream';
import { Server } from 'node:http';

@WebSocketGateway({ cors: '*' })
export class TranscriptionGateway {
  @WebSocketServer() server: Server;
  private wavWriter: WavWriter;

  constructor(private readonly transcriptionService: TranscriptionService) {}

  @SubscribeMessage('start-audio')
  async startAudio() {
    console.log(`start-audio`);

    this.wavWriter = new WavWriter({
      sampleRate: 44100,
      bitDepth: 16,
      channels: 1,
    });
  }

  @SubscribeMessage('binary-data')
  async binaryData(client: any, payload: Buffer) {
    console.log(`got ${payload ? payload.length : 0} bytes`);

    if (this.wavWriter) {
      this.wavWriter.write(payload);
    }
  }

  @SubscribeMessage('end-audio')
  async endAudio() {
    console.log(`end-audio`);

    if (this.wavWriter) {
      this.wavWriter.end();
      // Create a new PassThrough stream
      const passThroughStream = new PassThrough();

      // Pipe the Writer to the PassThrough stream
      this.wavWriter.pipe(passThroughStream);

      const transcription = await this.transcriptionService.transcribeStream(passThroughStream);
      console.log(transcription);

      this.server.emit('transcription', transcription);
    }
  }
}

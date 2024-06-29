import { Module } from '@nestjs/common';
import { SiswaService } from './siswa.service';

@Module({
  providers: [SiswaService],
  exports:[
    SiswaService
  ]
})
export class SiswaModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SiswaModule } from '../siswa/siswa.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    SiswaModule,
    PrismaModule
  ]
})
export class UserModule {}

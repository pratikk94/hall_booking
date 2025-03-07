// src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
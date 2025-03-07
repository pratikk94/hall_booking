import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seed')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  async seed() {
    await this.seederService.seed();
    return { message: 'Seeding completed' };
  }
}

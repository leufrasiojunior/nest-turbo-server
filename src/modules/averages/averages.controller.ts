import { Controller, Get } from '@nestjs/common';
import { AveragesService } from './averages.service';

@Controller('')
export class AveragesController {
  constructor(private readonly averagesService: AveragesService) {}

  @Get('averages')
  async getAverages() {
    return this.averagesService.getAverages();
  }
}

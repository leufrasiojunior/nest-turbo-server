import { Module } from '@nestjs/common';
import { AveragesService } from './averages.service';
import { AveragesController } from './averages.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AveragesController],
  providers: [AveragesService, PrismaService],
})
export class AveragesModule {}

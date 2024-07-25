import { Module } from '@nestjs/common';
import { ResultsModule } from './modules/results/results.module';
import { AveragesModule } from './modules/averages/averages.module';

@Module({
  imports: [ResultsModule, AveragesModule],
})
export class AppModule {}

import { Controller, Get, Query, Param, Res, HttpStatus } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get('list-results')
  async listResults(
    @Query('cursor') cursor: string,
    @Query('take') take: string,
    @Res() res,
  ) {
    const parsedCursor = cursor ? parseInt(cursor) : undefined;
    const parsedTake = parseInt(take) || 10;

    try {
      const totalRecords = await this.resultsService.getTotalResults();
      const results = await this.resultsService.listResults(
        parsedCursor,
        parsedTake,
      );
      const nextCursor =
        results.length > 0 ? results[results.length - 1].id : null;
      res.status(HttpStatus.OK).json({
        nextCursor,
        resultsLength: totalRecords,
        results,
      });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Error fetching records' });
    }
  }

  @Get('allresults')
  async getAllResults(@Res() res) {
    try {
      const results = await this.resultsService.getAllResults();
      res.status(HttpStatus.OK).json({ results });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Error fetching records' });
    }
  }

  @Get('list-results/:id')
  async getResultById(@Param('id') id: string, @Res() res) {
    try {
      const record = await this.resultsService.getResultById(Number(id));
      if (record) {
        res.status(HttpStatus.OK).json(record);
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ error: 'Record not found' });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error' });
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async listResults(cursor: number | undefined, take: number) {
    return this.prisma.results.findMany({
      orderBy: { id: 'desc' },
      cursor: cursor ? { id: cursor } : undefined,
      take: take,
    });
  }

  async getTotalResults() {
    return this.prisma.results.count();
  }

  async getAllResults() {
    return this.prisma.results.findMany({
      take: 1,
    });
  }

  async getResultById(id: number) {
    return this.prisma.results.findUnique({ where: { id: id } });
  }
}

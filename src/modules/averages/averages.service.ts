import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AveragesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAverages() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const result = await this.prisma.results.aggregate({
      _avg: {
        download: true,
        ping: true,
        upload: true,
      },
      where: {
        created_at: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    const totalUsedavarage = await this.prisma.results.count({
      where: {
        created_at: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    console.log(totalUsedavarage);
    const downloads = result._avg.download
      ? Math.round(result._avg.download)
      : 0;
    const upload = result._avg.upload ? Math.round(result._avg.upload) : 0;
    const ping = result._avg.ping;
    result._avg.ping ? parseFloat(result._avg.ping.toFixed(2)) : 0;

    return {
      totalUsedavarage,
      downloads,
      upload,
      ping,
    };
  }
}

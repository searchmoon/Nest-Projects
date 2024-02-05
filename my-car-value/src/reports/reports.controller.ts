import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReportDto } from './dtos/create-report-dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  // @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}

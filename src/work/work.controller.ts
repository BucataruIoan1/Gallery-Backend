import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './create-work.dto';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  create(@Body() createWorkDto: CreateWorkDto) {
    return this.workService.create(createWorkDto);
  }

  @Get()
  findAll(@Query('filter') filter: string) {
      return this.workService.findAll(filter);
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkDto: CreateWorkDto) {
    return this.workService.update(Number(id), updateWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workService.remove(Number(id));
  }
}

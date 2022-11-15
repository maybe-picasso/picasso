import { Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'this movies getAll()';
  }

  @Get('search')
  search(@Query('year') year: string) {
    return `this movies year: ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `this movies id: ${id}`;
  }

  @Post()
  create() {
    return 'this create a movie';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this remove a movie id: ${id}`;
  }

  @Patch(':id')
  patch(@Param('id') id: string) {
    return `this patch a movie id: ${id}`;
  }
}

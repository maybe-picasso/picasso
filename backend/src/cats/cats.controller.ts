import { Controller, HttpStatus, Get, Post, Delete, Param, Body, Res } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Res() res, @Body() data: CreateCatDto) {
    const result = await this.catsService.create(data);
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Get()
  async findAll() {
    const result = await this.catsService.findAll();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.catsService.findOne(id);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.catsService.delete(id);
    return result;
  }
}

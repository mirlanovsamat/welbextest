import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RecordService } from './record.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Record')
@UseGuards(AuthGuard)
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return await this.recordService.create(file, req.body.file, req.decode)
  }

  @Get()
  async findAll() {
    return await this.recordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.recordService.findOne(id); 
  }

  @Patch(':id')
  async update( @Param('id') id: string, @Req() req) {
    await this.recordService.update(id, req);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.recordService.remove(id);
  }
}

import { RecordEntity } from './entities/record.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as fs from 'fs'
import { InjectRepository } from '@nestjs/typeorm';
import  * as path from 'app-root-path'

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity) 
    private readonly recordRepository: Repository<RecordEntity>,
  ){}

  async create(file, message, decode) {
    if(!message){
      await this.recordRepository.save({message: file.filename, author: decode.name, user: decode.id })
    }
    if(!file){
      await this.recordRepository.save({message: message, author: decode.name, user: decode.id })
    }
    return 'This action adds a new record';
  }

  async findAll() {
    return await this.recordRepository.find()
  }

  async findOne(id: string) {
    return await this.recordRepository.findOne(id)
  }

  async update(id: string, req) {
    const uploadFolder = `${path}/uploads`;
    const record = new RecordEntity()
    Object.assign(record, await this.findOne(id))
    if(req.body.message){
      await this.recordRepository.save({id: id, message: req.body.message})
      await fs.unlink(`${uploadFolder}/${record.message}`, function(err){
        if (err) {
            console.log(err);
        }
      });
    }
    else {new Promise((resolve, reject) => { 
      const writeStream = fs.createWriteStream(`${uploadFolder}/${record.message}`)
      writeStream.write(req.body.buffer)
      writeStream.on('close', () => {resolve(record.message)});
      writeStream.on("error", err => reject(err));
      writeStream.end() 
    })}
  }

  async remove(id: string) {
    const uploadFolder = `${path}/uploads`;
    const record = new RecordEntity()
    Object.assign(record, await this.findOne(id))
    await fs.unlink(`${uploadFolder}/${record.message}`, function(err){
      if (err) {
          console.log(err);
      }
    });
    await this.recordRepository.delete({id: id})
  }
}

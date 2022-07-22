import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UploadFileMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let buffer = new Buffer('')
    if(req.body.message){
        next()
    }
    req.on('data', (chunk) => {
        buffer = Buffer.concat([buffer, chunk])
    })
    req.on('end', () => {
        req.body = {
            buffer
        }
        next()
    })
  }
}
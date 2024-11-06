import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as sharp from 'sharp';
import * as fs from 'fs';

@Injectable()
export class CompressImagePipe implements PipeTransform {
  async transform(image: Express.Multer.File, metadata: ArgumentMetadata) {
    if (image) {
      const compressImage = await sharp(image.path)
        .jpeg({ quality: 10 })
        .toBuffer();
      fs.writeFileSync(image.path, compressImage);
    }
    return image;
  }
}

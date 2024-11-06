import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(process.cwd(), 'public', 'imgs'),
        filename: (req, file, cb) => {
          cb(null, Date.now() + '_' + file.originalname.replace(' ', ''));
        },
      }),
    }),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}

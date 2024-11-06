import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
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
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}

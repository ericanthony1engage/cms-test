import * as multer from 'multer';
import { BadRequestException } from '@nestjs/common';
import { join, extname } from 'path';
import * as fs from 'fs';

export const MulterContentOptions = {
  limits: {
    files: 1,
    fileSize: 10 * 1024 * 1024,
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const destination = join(__dirname, `../../uploads`);
      fs.mkdirSync(destination, { recursive: true });
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, crypto.randomUUID() + extname(file.originalname));
    },
  }),
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'application/pdf',
      'video/mp4',
    ];
    if (!allowedMimes.includes(file.mimetype)) {
      cb(
        new BadRequestException(
          `Allowed MIME types are ${allowedMimes.join(', ')}`,
        ),
        false,
      );
      return;
    }
    cb(null, true);
  },
};

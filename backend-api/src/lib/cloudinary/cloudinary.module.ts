import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

// Cloudinary module dependencies
@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService, CloudinaryProvider]
})
export class CloudinaryModule {}

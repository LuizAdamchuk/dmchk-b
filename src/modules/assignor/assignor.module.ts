import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { PrismaService } from 'src/databases/PrismaService';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService, PrismaService],
})
export class AssignorModule {}

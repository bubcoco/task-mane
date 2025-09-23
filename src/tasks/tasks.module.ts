import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    // This makes the standard Repository<Task> available for injection
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [TasksController],
  // Add your custom repository to the providers array
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
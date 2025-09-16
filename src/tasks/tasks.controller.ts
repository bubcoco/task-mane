import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    // tasksService: TasksService;

    constructor(private tasksService: TasksService) {
        // this.tasksService = tasksService;
    }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }
}

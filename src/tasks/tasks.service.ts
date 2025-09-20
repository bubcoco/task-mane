import { Injectable } from '@nestjs/common';
import { Task } from './task-status.enum';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;

    //     //temp array to hole result
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }
    //     // if (search) {
    //     //     tasks = tasks.filter((task) => task.title.includes(search) || (task.description?.includes(search)));
    //     // }
    //     // return tasks;
    //     if (search) {
    //         tasks = tasks.filter((task) => {
    //             if (task.title.includes(search) || (task.description && task.description.includes(search))) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }
    //     return tasks;
    // }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find((task) => task.id === id);
    //     if (!found) {
    //         throw new Error(`Task with ID "${id}" not found`);
    //     }
    //     return found;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: Math.random().toString(36).substring(2, 15),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);

    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}

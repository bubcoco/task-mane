import { Test } from '@nestjs/testing';
import { TasksService } from './tasks/tasks.service';
import { TasksRepository } from './tasks/tasks.repository';
import { TaskStatus } from './tasks/task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { Task } from './tasks/task.entity';


const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
});

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository; 

  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  
  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      
      const mockFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some query' };
      tasksRepository.getTasks.mockResolvedValue('someValue');
      
      
      const result = await tasksService.getTasks(mockFilterDto);

      
      expect(tasksRepository.getTasks).toHaveBeenCalledWith(mockFilterDto);
      expect(result).toEqual('someValue');
    });
  });

  
  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the task', async () => {
      
      const mockTask: Partial<Task> = { id: 'someId', title: 'Test task', description: 'Test desc' };
      tasksRepository.findOne.mockResolvedValue(mockTask);

      
      const result = await tasksService.getTaskById('someId');
      
      
      expect(tasksRepository.findOne).toHaveBeenCalledWith({ where: { id: 'someId' } });
      expect(result).toEqual(mockTask);
    });

    it('throws a NotFoundException if task is not found', async () => {
      
      tasksRepository.findOne.mockResolvedValue(null);

      
      await expect(tasksService.getTaskById('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  
  describe('createTask', () => {
    it('calls TasksRepository.createTask and returns the created task', async () => {
      
      const createTaskDto = { title: 'New Task', description: 'New Desc' };
      const mockCreatedTask = { id: 'newId', ...createTaskDto, status: TaskStatus.OPEN };
      tasksRepository.createTask.mockResolvedValue(mockCreatedTask);
      
      
      const result = await tasksService.createTask(createTaskDto);
      
      
      expect(tasksRepository.createTask).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(mockCreatedTask);
    });
  });

  
  describe('deleteTask', () => {
    it('calls TasksRepository.delete and deletes the task successfully', async () => {
      
      tasksRepository.delete.mockResolvedValue({ affected: 1 });
      
      
      await tasksService.deleteTask('someId');

      
      expect(tasksRepository.delete).toHaveBeenCalledWith('someId');
    });

    it('throws a NotFoundException if task to delete is not found', async () => {
      
      tasksRepository.delete.mockResolvedValue({ affected: 0 });

      
      await expect(tasksService.deleteTask('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  
  
  describe('updateTaskStatus', () => {
    it('updates a task status and returns the updated task', async () => {
        
        const mockTask: Task = { 
          id: 'someId', 
          title: 'Test Task', 
          description: 'Test Desc', 
          status: TaskStatus.OPEN 
        };
        
        tasksRepository.findOne.mockResolvedValue(mockTask);
        tasksRepository.save.mockImplementation(async (task) => task); // Mock save to return the passed task

        
        const result = await tasksService.updateTaskStatus('someId', TaskStatus.DONE);

        
        expect(tasksRepository.findOne).toHaveBeenCalledWith({ where: { id: 'someId' } });
        expect(tasksRepository.save).toHaveBeenCalledWith({ ...mockTask, status: TaskStatus.DONE });
        expect(result.status).toEqual(TaskStatus.DONE);
    });
  });
});
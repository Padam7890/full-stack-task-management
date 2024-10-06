import { Injectable } from '@nestjs/common';
import { CreateTaskDto, StatusDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DatabaseService } from 'src/database/database.service';
import { Task } from '@prisma/client';


//Task Services here 
@Injectable()
export class TaskService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({
      data: createTaskDto,
    });
    return task;
  }

  //find all Task by database
  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      orderBy:{
        createdAt: 'desc',
      }
      
    });
    return tasks;
  }

  //find task by id
  async findtaskByid(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    return task;
  }


  //update the taskon database
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
    return task;
  }


  //update specific status on databse
  async updateTaskStatus(id: number, status: StatusDto): Promise<Task> {
    const task = await this.prisma.task.update({
      where: {
        id: id, 
      },
      data: {
        status: status.status, 
      },
    });
  
    return task;  
  }
  

  //Remove task on databas
  async remove(id: number): Promise<Task> {
    const task = await this.prisma.task.delete({
      where: { id },
    });
    return task;
  }
  async search(search: string): Promise<Task[]> {
    if (!search) {
      return this.prisma.task.findMany();
    }

    const tasks = await this.prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      },
      take: 100,
    });

    if (tasks.length === 0) {
      return this.prisma.task.findMany();
    }

    return tasks;
  }
}

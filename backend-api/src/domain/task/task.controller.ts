import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TaskService } from './task.service';
import { CreateTaskDto, SearchTaskDto, StatusDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UniversalDecorator } from '../../common/decorators/universal.decorator';
import { createResponse } from '../../helper/response.helper';
import { JwtAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';

//all task related work Here , CRUD METHOD
@Controller('tasks')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //Search Task
  @Get('search')
  @Post()
  @UniversalDecorator({
    role: process.env.ACCESS_ROLE,
    summary: 'Search Task',
  })
  async search(@Query() searchTaskDto: SearchTaskDto) {
    const response = await this.taskService.search(searchTaskDto.search);
    if (response.length === 0) {
      return createResponse(HttpStatus.NOT_FOUND, 'No task found', response);
    }
    return createResponse(
      HttpStatus.OK,
      'Tasks fetched successfully',
      response,
    );
  }

  //Create a New Task
  @Post()
  @UniversalDecorator({
    role: process.env.ACCESS_ROLE,
    summary: 'Update Task',
    responseType: CreateTaskDto,
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const response = await this.taskService.create(createTaskDto);
    return createResponse(
      HttpStatus.CREATED,
      'Task created successfully',
      response,
    );
  }

  //get all tasks
  @Get()
  @UniversalDecorator({
    role: process.env.ACCESS_ROLE,
    summary: 'ALL Tasks',
  })
  async findAll() {
    const response = await this.taskService.findAll();
    return createResponse(
      HttpStatus.OK,
      'Tasks fetched successfully',
      response,
    );
  }

  //get task by id
  @Get(':id')
  @UniversalDecorator({
    role: process.env.ACCESS_ROLE,
    summary: 'Find Task By Id',
  })
  async findTaskById(@Param('id') id: string) {
    const response = await this.taskService.findtaskByid(+id);
    return createResponse(HttpStatus.OK, 'Task fetched successfully', response);
  }

  //update task
  @Patch(':id')
  @UniversalDecorator({
    role: process.env.ACCESS_ROLE,
    summary: 'Update Task',
    responseType: UpdateTaskDto,
  })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const response = await this.taskService.update(+id, updateTaskDto);
    return createResponse(HttpStatus.OK, 'Task updated successfully', response);
  }

  //delete task using id
  @Delete(':id')
  @UniversalDecorator({
    role: process.env.ACCESS_ROLE,
    summary: 'Delete Task',
  })
  async remove(@Param('id') id: string) {
    const response = await this.taskService.remove(+id);
    return createResponse(HttpStatus.OK, 'Task deleted successfully', response);
  }

  //update task using task Status like pending | completed
  @Patch('/updateTask/:id')
  @UniversalDecorator({
    role: process.env.ACCESS_ROLE,
    summary: 'Update Task',
    responseType: StatusDto,
  })
  async updateTaskStatus(@Param('id') id: string, @Body() status: StatusDto) {
    const response = await this.taskService.updateTaskStatus(+id, status);
    return createResponse(
      HttpStatus.OK,
      'Task Status updated successfully',
      response,
    );
  }
}

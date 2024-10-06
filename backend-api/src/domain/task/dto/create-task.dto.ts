import { ApiProperty } from "@nestjs/swagger";
import { Priority, Status } from "@prisma/client";
import { IsEnum, isEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}


export class SearchTaskDto {
  @ApiProperty()
  @IsString()

  search: string;
}

export class StatusDto{
  @ApiProperty()
  @IsString()
  @IsEnum(Status)
  status: Status;
}


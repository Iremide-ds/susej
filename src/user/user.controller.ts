import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsersService } from './user.service';
import UserDTO from './user.dto';
import ResponseDTO from '../dto/response.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of users.',
    type: ResponseDTO,
  })
  async getAllUsers(): Promise<ResponseDTO> {
    return new ResponseDTO('all users', await this.userService.getAllUsers());
  }

  @Post()
  @ApiBody({
    description: 'Create User',
    type: UserDTO,
    required: true,
    isArray: false,
  })
  @ApiResponse({
    status: 201,
    description: 'Create a user.',
    type: ResponseDTO,
  })
  async createUser(@Body() userDTO: UserDTO): Promise<ResponseDTO> {
    return new ResponseDTO(await this.userService.createUser(userDTO));
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns one user.',
    type: ResponseDTO,
  })
  async getUser(@Param() params: any): Promise<ResponseDTO> {
    const { id } = params;
    const response = await this.userService.getUser(id);
    if (typeof response == 'string') {
      return new ResponseDTO(response);
    } else {
      return new ResponseDTO('success', response);
    }
  }

  @Put(':id')
  @ApiBody({
    description: 'Create User',
    type: UserDTO,
    required: true,
    isArray: false,
  })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the user.' })
  @ApiResponse({
    status: 200,
    description: 'updates one user.',
    type: ResponseDTO,
  })
  async updateUser(
    @Param() params: any,
    @Body() userDTO: UserDTO,
  ): Promise<ResponseDTO> {
    const { id } = params;
    return new ResponseDTO(await this.userService.updateUser(id, userDTO));
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'The ID of the user.' })
  @ApiResponse({
    status: 200,
    description: 'Deletes one user.',
    type: ResponseDTO,
  })
  async deleteUser(@Param() params: any): Promise<ResponseDTO> {
    const { id } = params;
    return new ResponseDTO(await this.userService.deleteUser(id));
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { PaginateQueryDto } from './dto/paginate-query.dto';
import { IntDefaultValuePipe } from 'src/pipes/int-default-values.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get('/fetch-all-paginated')
  async fetchAllPaginated(@Query() paginateQuery?: PaginateQueryDto) {
    return this.usersService.fetchAllPaginated(paginateQuery);
  }

  @Get('/fetch-all-paginated-query-builder')
  async fetchAllPaginatedQueryBuilder(
    @Query() paginateQuery?: PaginateQueryDto,
  ) {
    return this.usersService.fetchAllPaginatedQueryBuilder(paginateQuery);
  }

  @Get('/fetch-all-paginated-query-builder-raw')
  async fetchAllPaginatedQueryBuilderRaw(
    @Query() paginateQuery?: PaginateQueryDto,
  ) {
    return this.usersService.fetchAllPaginatedQueryBuilderRaw(paginateQuery);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post('/batch-mock-users')
  async batchMock(
    @Query('count', new IntDefaultValuePipe(undefined)) count?: number,
  ): Promise<UserEntity[]> {
    console.log(count);
    return this.usersService.batchMockUsers(count);
  }
}

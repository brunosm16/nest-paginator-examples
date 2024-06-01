import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { faker } from '@faker-js/faker';
import { makePaginator } from 'nest-paginator';
import { PaginateQueryDto } from './dto/paginate-query.dto';
import { PaginatorResult } from 'src/types/pagination';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private createUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
  }

  async batchMockUsers(count: number = 100): Promise<User[]> {
    const users = [];

    for (let i = 0; i < count; i++) {
      const user = this.createUser();
      this.usersRepository.save(user);
      users.push(user);
    }

    return users;
  }

  private getPaginationRoute(paginateQuery: PaginateQueryDto) {
    if (!paginateQuery?.hasRoute) {
      return null;
    }

    return 'http://localhost:3000/users/fetch-all-paginate';
  }

  async fetchAllPaginated(
    paginateQuery: PaginateQueryDto,
  ): Promise<PaginatorResult<User>> {
    const { limit = 10, page = 1 } = paginateQuery;
    const route = this.getPaginationRoute(paginateQuery);
    const userPaginator = makePaginator<User>();

    const paginationResult = userPaginator.paginate(this.usersRepository, {
      limit: limit,
      page: page,
      route: route,
    });

    return paginationResult;
  }
}

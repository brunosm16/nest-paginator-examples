import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { faker } from '@faker-js/faker';
import { makePaginator } from 'nest-paginator';
import { PaginateQueryDto } from './dto/paginate-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();

    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.address = createUserDto.address;
    user.state = createUserDto.state;
    user.zip_code = createUserDto.zip_code;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ user_id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private createUser(): Partial<UserEntity> {
    return {
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
    };
  }

  async batchMockUsers(count: number = 100): Promise<UserEntity[]> {
    const users = [];

    for (let i = 0; i < count; i++) {
      const user = this.createUser();
      this.usersRepository.save(user);
      users.push(user);
    }

    return users;
  }

  async fetchAllPaginated(paginateQuery: PaginateQueryDto) {
    try {
      const { limit = 10, page = 1 } = paginateQuery;
      const userPaginator = makePaginator<UserEntity>();

      const paginationResult = await userPaginator.paginate(
        this.usersRepository,
        {
          limit: limit,
          page: page,
        },
      );

      return paginationResult;
    } catch (err) {
      if (err?.errors) {
        throw new BadRequestException(err?.errors);
      }
      throw err;
    }
  }
}

import { IsNumber } from 'class-validator';

export class PaginateQueryDto {
  @IsNumber()
  page: number;
  @IsNumber()
  limit: number;
}

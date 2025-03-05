import { IsString, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  name: string;
  price: number;
  description: string;
}

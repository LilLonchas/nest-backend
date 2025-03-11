import { IsInt, IsPositive } from 'class-validator';

export class CreateCartDto {
    @IsInt()
    userId: number;

    @IsInt()
    productId: number;

    @IsPositive()
    quantity: number;
}

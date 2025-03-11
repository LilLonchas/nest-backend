import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard) // Solo usuarios autenticados pueden acceder
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    async addToCart(@Body() createCartDto: CreateCartDto) {
        return this.cartService.addToCart(createCartDto);
    }

    @Get(':userId')
    async getCart(@Param('userId') userId: number) {
        return this.cartService.getCartByUser(userId);
    }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) {}

    // Añadir producto al carrito
    async addToCart(createCartDto: CreateCartDto) {
        const { userId, productId, quantity } = createCartDto;

        // Verificar si el producto ya está en el carrito
        const existingItem = await this.cartRepository.findOne({
            where: { user: { id: userId }, product: { id: productId } },
        });

        if (existingItem) {
            // Si ya existe, solo se incrementa la cantidad
            existingItem.quantity += quantity;
            await this.cartRepository.save(existingItem);
            return { message: 'Cantidad actualizada correctamente en el carrito' };
        }

        // Si no existe, se crea una nueva entrada
        const newCartItem = this.cartRepository.create(createCartDto);
        await this.cartRepository.save(newCartItem);
        return { message: 'Producto añadido correctamente al carrito' };
    }

    // Obtener el carrito por ID de usuario
    async getCartByUser(userId: number) {
        const cartItems = await this.cartRepository.find({
            where: { user: { id: userId } },
            relations: ['product'],
        });

        if (!cartItems.length) {
            throw new NotFoundException('El carrito está vacío o el usuario no existe.');
        }

        return cartItems;
    }

    // Eliminar un producto del carrito
    async removeFromCart(userId: number, productId: number) {
        const result = await this.cartRepository.delete({ 
            user: { id: userId }, 
            product: { id: productId } 
        });

        if (result.affected === 0) {
            throw new NotFoundException('Producto no encontrado en el carrito.');
        }

        return { message: 'Producto eliminado del carrito correctamente' };
    }
}

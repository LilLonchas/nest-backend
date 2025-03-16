import { Admin } from "src/producto/admin/entities/admin.entity"; // Revisa la ruta si es otra
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Esto crea una tabla llamada 'articulo'
export class Articulo {

  @PrimaryGeneratedColumn() // ID único del artículo
  id: number;

  @Column() // Título del artículo
  titulo: string;

  @Column() // Descripción del artículo
  descripcion: string;

  @Column() // URL de la imagen de portada
  portadaUrl: string;

  // Relación: cada artículo pertenece a un admin
  @ManyToOne(
    () => Admin, // Qué entidad es el dueño
    (admin) => admin.articulos // Cómo el Admin referencia los artículos
  )
  admin: Admin;
}

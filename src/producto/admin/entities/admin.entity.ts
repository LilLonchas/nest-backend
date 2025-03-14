import { Articulo } from "src/producto/articulo/entities/articulo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Esto crea una tabla llamada 'admin'
export class Admin {

  @PrimaryGeneratedColumn() // Es como el número de identificación único
  id: number;

  @Column() // Es como decirle que va a tener un nombre
  nombre: string;

  @Column() // Es como decirle que va a tener una descripción
  descripcion: string;

  @Column() // La URL de la foto del Admin
  fotoUrl: string;

  // El admin tiene muchos artículos
  @OneToMany(
    () => Articulo,  // Qué entidad se relaciona (Articulo)
    (articulo) => articulo.admin // Cómo el Articulo referencia al Admin
  )
  articulos: Articulo[];
}

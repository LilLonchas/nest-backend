import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(6, 20)
  password: string;

  @Column()
  name: string;
}

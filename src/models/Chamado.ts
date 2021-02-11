import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("chamados")
export default class Chamado {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  whatsapp: string;

  @Column()
  description: string;
}
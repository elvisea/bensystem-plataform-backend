import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("orcamentos")
export default class Orcamento {
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
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany
} from "typeorm";

import Image from './Image'

@Entity("contacts")
export default class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @OneToMany(() => Image, (image) => image.contact, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "contact_id" })
  images: Image[];
}
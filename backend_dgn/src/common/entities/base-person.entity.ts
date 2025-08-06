import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BasePerson {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nom: string;

  @Column()
  postNom: string;

  @Column()
  prenom: string;

  @Column({
    type: "enum",
    enum: ["Homme", "Femme"],
    default: "Homme",
  })
  genre: "Homme" | "Femme";

  @Column({ nullable: true, unique: true })
  telephone: string;

  @Column({ nullable: true })
  photo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 
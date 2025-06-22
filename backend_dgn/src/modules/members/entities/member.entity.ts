import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("members")
export class Member {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nom: string;

  @Column()
  postNom: string;

  @Column()
  prenom: string;

  @Column()
  qualiteMembre: string;

  @Column()
  province: string;

  @Column()
  adresse: string;

  @Column({ nullable: true, unique: true })
  telephone: string;

  @Column({ nullable: true })
  photo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

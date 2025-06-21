import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("members")
export class Member {
  @PrimaryGeneratedColumn("uuid")
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

  @Column()
  telephone: string;

  @Column()
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  photo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

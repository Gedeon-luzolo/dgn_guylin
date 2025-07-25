import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("members")
export class Member {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne("User", "member", { eager: true })
  @JoinColumn()
  user: User;

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

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

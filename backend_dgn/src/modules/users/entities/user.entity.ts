import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { Member } from "../../members/entities/member.entity";
import { Agent } from "../../agents/entities/agent.entity";

export enum Gender {
  MALE = "M",
  FEMALE = "F",
}

@Entity("users")
export class User {
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

  @OneToOne("Member", "user")
  member: Member;

  @OneToOne("Agent", "user")
  agent: Agent;
}

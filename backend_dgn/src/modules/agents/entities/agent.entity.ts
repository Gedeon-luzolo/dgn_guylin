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

@Entity("agents")
export class Agent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne("User", "agent", { eager: true })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  fonction: string;

  @Column({ nullable: true })
  societe: string;

  @Column({ nullable: true })
  appartenancePolitique: string;

  @Column({ nullable: true })
  niveauEtudes: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { BasePerson } from "../../../common/entities/base-person.entity";
import { User } from "../../users/entities/user.entity";

@Entity("agents")
export class Agent extends BasePerson {
  @OneToOne("User", "agent", { eager: true, nullable: true })
  @JoinColumn()
  user: User | null;

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
}

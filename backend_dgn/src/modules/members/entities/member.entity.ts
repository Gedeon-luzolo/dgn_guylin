import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { BasePerson } from "../../../common/entities/base-person.entity";
import { User } from "../../users/entities/user.entity";

@Entity("members")
export class Member extends BasePerson {
  @OneToOne("User", "member", { eager: true, nullable: true })
  @JoinColumn()
  user: User | null;

  @Column()
  qualiteMembre: string;

  @Column()
  province: string;

  @Column()
  adresse: string;

  @Column({ default: true })
  isActive: boolean;
}

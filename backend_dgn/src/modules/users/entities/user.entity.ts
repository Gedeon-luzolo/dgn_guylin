import {
  Entity,
  OneToOne,
} from "typeorm";
import { BasePerson } from "../../../common/entities/base-person.entity";
import { Member } from "../../members/entities/member.entity";
import { Agent } from "../../agents/entities/agent.entity";

@Entity("users")
export class User extends BasePerson {
  @OneToOne("Member", "user", { nullable: true })
  member: Member | null;

  @OneToOne("Agent", "user", { nullable: true })
  agent: Agent | null;
}

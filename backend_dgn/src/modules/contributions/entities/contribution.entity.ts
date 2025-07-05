import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { Agent } from "../../agents/entities/agent.entity";

export enum Currency {
  USD = "USD",
  CDF = "CDF",
}

@Entity()
export class Contribution {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  reference: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  montant: number;

  @Column()
  moisConcerne: string; // Format: "MM/YYYY"

  @Column({
    type: "enum",
    enum: Currency,
    default: Currency.USD,
  })
  devise: Currency;

  @ManyToOne(() => Agent, { eager: true })
  @JoinColumn()
  agent: Agent;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateReference() {
    // La référence sera générée automatiquement lors de la création
    // Format: DGN-YYYYMMDD-UUID (les 3 premiers caractères)
    const date = new Date();
    const year = date.getFullYear();
    this.reference = `DGN-${year}`;
  }
}

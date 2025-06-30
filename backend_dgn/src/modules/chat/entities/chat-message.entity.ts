import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("chat_messages")
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  userMessage: string;

  @Column("text")
  aiResponse: string;

  @Column({ nullable: true })
  sessionId: string;

  @Column({ default: 0 })
  responseTime: number; // en millisecondes

  @Column({ default: false })
  isSuccessful: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Member } from "src/modules/members/entities/member.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

// Déclarer News en premier
@Entity("news")
export class News {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @ManyToOne(() => Member, { eager: true })
  @JoinColumn()
  author: Member;

  @OneToMany(() => NewsImage, (image) => image.news, {
    cascade: true,
    eager: true,
  })
  images: NewsImage[];

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  commentsCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// Puis déclarer NewsImage qui fait référence à News
@Entity("news_images")
export class NewsImage {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  alt: string;

  @Column({ nullable: true })
  caption: string;

  @Column({ default: false })
  isMain: boolean;

  @ManyToOne(() => News, (news) => news.images, { onDelete: "CASCADE" })
  news: News;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

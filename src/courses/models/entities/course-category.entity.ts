import { Entity, Column, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class CourseCategory extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Course, (course) => course.category)
  courses: Course[];
}

import { Entity, Column, ManyToOne } from 'typeorm';
import { CourseCategory } from './course-category.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Course extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => CourseCategory, (category) => category.courses)
  category: CourseCategory;
}

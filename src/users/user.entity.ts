import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100, unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (!this.password) return;

    try {
      const salt: string = await bcrypt.genSalt(10);
      const hashedPassword: string = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    } catch (error) {
      const err = error as Error;
      console.error('Error al hashear la contraseña:', err.message);
      throw err;
    }
  }
}

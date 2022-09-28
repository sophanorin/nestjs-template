import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 255, name: 'first_name' })
  last_name!: string;

  @Column('varchar', { nullable: false, length: 255, name: 'last_name' })
  first_name!: string;

  @Column('varchar', { nullable: false, length: 255, name: 'full_name' })
  full_name!: string;

  @Column('varchar', { nullable: true, length: 255, name: 'phone_number' })
  phone_number?: string;

  @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updated_at!: Date;

  @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  created_at!: Date;
}

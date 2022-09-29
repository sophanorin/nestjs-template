import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
    id!: number;

    @Column('varchar', { nullable: false, length: 255, name: 'name' })
    name!: string;

    @Column('int', { name: 'user_id' })
    user_id!: string;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updated_at!: Date;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    created_at!: Date;
}

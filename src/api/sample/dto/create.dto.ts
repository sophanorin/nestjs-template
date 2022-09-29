import { IsString } from 'class-validator';

import type { User } from '../../../entity/user';

export class CreateDto implements Omit<User, 'id' | 'updated_at' | 'created_at'> {
    @IsString()
    public first_name!: string;

    @IsString()
    public last_name!: string;

    @IsString()
    public full_name!: string;

    @IsString()
    public phone_number!: string;

    // @IsOptional()
    // @IsString()
    // public content?: string;

    // @ArrayNotEmpty()
    // @IsString({ each: true })
    // public tags!: string[];
}

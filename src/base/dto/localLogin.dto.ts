import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LocalLoginDto {
    @ApiProperty({ required: true, example: 'user1' })
    @IsNotEmpty()
    public username!: string;

    @ApiProperty({ required: true, example: '123' })
    @IsNotEmpty()
    public password!: string;
}

import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: number;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
export declare class UserResponseDto {
    id: number;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    constructor(partial: Partial<UserResponseDto>);
}

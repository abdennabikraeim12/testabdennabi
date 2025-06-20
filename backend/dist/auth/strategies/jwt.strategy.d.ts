import { UsersService } from '../../users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<{
        email: string;
        username: string;
        password: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};

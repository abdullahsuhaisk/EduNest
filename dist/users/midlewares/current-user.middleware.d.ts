import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../user.entity';
import { UsersService } from '../users.service';
declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}
export declare class CurrentUserMidleware implements NestMiddleware {
    private usersService;
    constructor(usersService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}

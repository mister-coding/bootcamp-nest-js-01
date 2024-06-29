import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService) { }

    async getListUser() {
        return await this.prismaService.user.findMany({
            select:{
                name: true,
            },
            where:{
                id: 1
            }
        });
    }

}

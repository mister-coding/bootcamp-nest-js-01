import {  Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UppercasePipe } from '../pipes/uppercase/uppercase.pipe';
import { AuthGuard } from '../guards/auth/auth.guard';
import { XToken } from '../decorators/x-token/x-token.decorator';
import { Roles } from '../decorators/roles/roles.decorator';
import { RolesGuard } from '../guards/roles/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ) {
    }

    // @UseGuards(AuthGuard)
    @Get()
    async getUser() {
        return await this.userService.getListUser();
    }

    @Get(":id")
    async getUserById(@Param('id') id) {
        return "User " + id
    }

    
    @Roles("admin","sales")
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async createUser(@Body(UppercasePipe) body, @XToken() xToken) {
        console.log("xtoken :", xToken);
        return { data: body, message: "from controller" };
    }

    @Put("/:id")
    async updateUser(@Body() body, @Param('id') id) {
        return {
            id: id,
            data: body
        }
    }

    @Delete("/:id")
    async deleteUser(@Param('id') id) {
        return "Delete User " + id
    }


}

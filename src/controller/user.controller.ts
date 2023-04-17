import { Body, Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { createPaginationOptions, PaginationOptions } from "src/helper/pagination.helper";
import { responseError, responsePage, response } from "src/helper/response.helper";
import { UserService } from "src/service/user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('userlist')
    @UseGuards(JwtAuthGuard)
    async getUserList(@Req() req, @Body() body: any) {
        try {
            const pagination: PaginationOptions = createPaginationOptions(req)
            const [result, total] = await this.userService.getUser(pagination, body.search)
            return responsePage(result, total, pagination)
        } catch (e) {
            return responseError(e.message, 400)
        }
    }
}
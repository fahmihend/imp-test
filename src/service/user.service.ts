import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { Users } from "src/entity/users.entity";
import { PaginationOptions } from "src/helper/pagination.helper";
import { Brackets, EntityManager } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private conn: EntityManager) {
    this.conn = conn
  }

  async getUser(pagination: PaginationOptions, search?: string) {
    try {
      const query = this.conn.createQueryBuilder(Users, 'a');
      if (search && search !== '') {
        query.andWhere(
          new Brackets((qb) => {
            qb.where('a.username like :username', {
              username: `%${search}%`,
            }).orWhere('a.fullname like :fullname', {
              fullname: `%${search}%`,
            });
          }),
        );
      }
      console.log(await query.getMany())
      return await query.take(pagination.queryPage)
      .limit(pagination.limit)
      .getManyAndCount();
    } catch (e) {
      throw e;
    }
  }
}
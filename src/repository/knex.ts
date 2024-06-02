import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class KnexDB {
  constructor(@InjectKnex() readonly knex_: Knex) {}

  protected checkExist_ = async (query: any) => {
    const check = await this.knex_.raw(
      `select exists(${query.first(1).toQuery()}) as "check"`,
    );
    return check.rows[0].check;
  };
}

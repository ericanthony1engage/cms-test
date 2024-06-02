import { Injectable } from '@nestjs/common';
import { Content } from '../dto/content/model.dto';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class ContentRepository {
  constructor(@InjectKnex() readonly knex_: Knex) {}

  protected checkExist_ = async (query: any) => {
    const check = await this.knex_.raw(
      `select exists(${query.first(1).toQuery()}) as "check"`,
    );
    return check.rows[0].check;
  };

  private _db = () => {
    return this.knex_<Content>(Content.getTableName);
  };

  public checkContentPublicIdExists = (public_id: string): Promise<boolean> => {
    return this.checkExist_(this._db().where({ public_id: public_id }));
  };

  public getContentByPublicId = async (public_id: string): Promise<Content> => {
    return this._db().where({ public_id: public_id }).first();
  };

  public insertContent = async (file: string): Promise<string> => {
    const [{ public_id }] = await this._db().insert(
      {
        file,
      },
      'public_id',
    );

    return public_id;
  };
}

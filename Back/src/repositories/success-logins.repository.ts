import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {SuccessLogins, SuccessLoginsRelations} from '../models';

export class SuccessLoginsRepository extends DefaultCrudRepository<
  SuccessLogins,
  typeof SuccessLogins.prototype.id,
  SuccessLoginsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(SuccessLogins, dataSource);
  }
}

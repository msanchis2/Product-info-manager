import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ResetPasswords, ResetPasswordsRelations} from '../models';

export class ResetPasswordsRepository extends DefaultCrudRepository<
  ResetPasswords,
  typeof ResetPasswords.prototype.id,
  ResetPasswordsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ResetPasswords, dataSource);
  }
}

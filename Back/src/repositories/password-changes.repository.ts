import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PasswordChanges, PasswordChangesRelations} from '../models';

export class PasswordChangesRepository extends DefaultCrudRepository<
  PasswordChanges,
  typeof PasswordChanges.prototype.id,
  PasswordChangesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PasswordChanges, dataSource);
  }
}

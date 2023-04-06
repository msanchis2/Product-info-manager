import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {RememberTokens, RememberTokensRelations} from '../models';

export class RememberTokensRepository extends DefaultCrudRepository<
  RememberTokens,
  typeof RememberTokens.prototype.id,
  RememberTokensRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(RememberTokens, dataSource);
  }
}

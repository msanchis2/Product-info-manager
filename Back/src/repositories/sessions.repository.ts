import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sessions, SessionsRelations} from '../models';

export class SessionsRepository extends DefaultCrudRepository<
  Sessions,
  typeof Sessions.prototype.id,
  SessionsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Sessions, dataSource);
  }
}

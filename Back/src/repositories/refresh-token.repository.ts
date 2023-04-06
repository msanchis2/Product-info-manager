import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {RefreshToken, RefreshTokenRelations} from '../models';

export class RefreshTokenRepository extends DefaultCrudRepository<
  RefreshToken,
  typeof RefreshToken.prototype.id,
  RefreshTokenRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(RefreshToken, dataSource);
  }
}

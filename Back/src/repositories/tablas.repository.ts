import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tablas, TablasRelations} from '../models';

export class TablasRepository extends DefaultCrudRepository<
Tablas,
  typeof Tablas.prototype.id,
  TablasRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Tablas, dataSource);
  }
}

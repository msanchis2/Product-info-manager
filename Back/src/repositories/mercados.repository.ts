import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Mercados, MercadosRelations} from '../models';

export class MercadosRepository extends DefaultCrudRepository<
  Mercados,
  typeof Mercados.prototype.id,
  MercadosRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Mercados, dataSource);
  }
}

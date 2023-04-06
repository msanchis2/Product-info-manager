import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {GruposAtributos, GruposAtributosRelations} from '../models';

export class GruposAtributosRepository extends DefaultCrudRepository<
  GruposAtributos,
  typeof GruposAtributos.prototype.id,
  GruposAtributosRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(GruposAtributos, dataSource);
  }
}

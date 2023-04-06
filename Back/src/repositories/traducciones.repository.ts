import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Traducciones, TraduccionesRelations} from '../models';

export class TraduccionesRepository extends DefaultCrudRepository<
  Traducciones,
  typeof Traducciones.prototype.id,
  TraduccionesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Traducciones, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Situaciones, SituacionesRelations} from '../models';

export class SituacionesRepository extends DefaultCrudRepository<
  Situaciones,
  typeof Situaciones.prototype.id,
  SituacionesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Situaciones, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plantilla, PlantillaRelations} from '../models';

export class PlantillaRepository extends DefaultCrudRepository<
  Plantilla,
  typeof Plantilla.prototype.id,
  PlantillaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Plantilla, dataSource);
  }
}

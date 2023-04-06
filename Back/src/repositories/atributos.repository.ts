import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Atributos, AtributosRelations} from '../models';

export class AtributosRepository extends DefaultCrudRepository<
  Atributos,
  typeof Atributos.prototype.id,
  AtributosRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Atributos, dataSource);
  }
}

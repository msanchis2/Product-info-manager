import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Categorias, CategoriasRelations} from '../models';

export class CategoriasRepository extends DefaultCrudRepository<
  Categorias,
  typeof Categorias.prototype.id,
  CategoriasRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Categorias, dataSource);
  }
}

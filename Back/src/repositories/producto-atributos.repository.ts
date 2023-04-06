import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProductoAtributos, ProductoAtributosRelations} from '../models';

export class ProductoAtributosRepository extends DefaultCrudRepository<
  ProductoAtributos,
  typeof ProductoAtributos.prototype.id,
  ProductoAtributosRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ProductoAtributos, dataSource);
  }
}

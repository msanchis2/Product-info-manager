import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProductoGeneral, ProductoGeneralRelations} from '../models';

export class ProductoGeneralRepository extends DefaultCrudRepository<
  ProductoGeneral,
  typeof ProductoGeneral.prototype.id,
  ProductoGeneralRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ProductoGeneral, dataSource);
  }
}

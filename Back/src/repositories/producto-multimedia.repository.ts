import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProductoMultimedia, ProductoMultimediaRelations} from '../models';

export class ProductoMultimediaRepository extends DefaultCrudRepository<
  ProductoMultimedia,
  typeof ProductoMultimedia.prototype.id,
  ProductoMultimediaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ProductoMultimedia, dataSource);
  }
}

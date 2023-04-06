import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Multimedia, MultimediaRelations} from '../models';

export class MultimediaRepository extends DefaultCrudRepository<
  Multimedia,
  typeof Multimedia.prototype.id,
  MultimediaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Multimedia, dataSource);
  }
}

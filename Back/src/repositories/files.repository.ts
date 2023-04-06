import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Files, FilesRelations} from '../models';

export class FilesRepository extends DefaultCrudRepository<
  Files,
  typeof Files.prototype.id,
  FilesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Files, dataSource);
  }
}

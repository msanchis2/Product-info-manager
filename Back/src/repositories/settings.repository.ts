import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Settings, SettingsRelations} from '../models';

export class SettingsRepository extends DefaultCrudRepository<
  Settings,
  typeof Settings.prototype.id,
  SettingsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Settings, dataSource);
  }
}

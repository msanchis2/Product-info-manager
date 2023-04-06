import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Empresas, EmpresasRelations} from '../models';

export class EmpresasRepository extends DefaultCrudRepository<
  Empresas,
  typeof Empresas.prototype.id,
  EmpresasRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Empresas, dataSource);
  }
}

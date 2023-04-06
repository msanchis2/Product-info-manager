import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Permisos, Roles, RolesRelations} from '../models';
import {PermisosRepository} from './permisos.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {

  public readonly permisos: HasManyRepositoryFactory<Permisos, typeof Roles.prototype.id>;
  // Relaciono los permisos con los roles(dos repositorios)
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('PermisosRepository') protected permisosRepositoryGetter: Getter<PermisosRepository>,//No esta apuntando bien?
  ) {
    super(Roles, dataSource);
    // Aqui haría otra relacion???
    this.permisos = this.createHasManyRepositoryFactoryFor('permisos', permisosRepositoryGetter);//undefined?
    this.registerInclusionResolver('permisos', this.permisos.inclusionResolver);
  }
}

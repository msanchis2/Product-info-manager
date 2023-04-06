import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Roles, Usuarios, UsuariosRelations} from '../models';
import {RolesRepository} from './roles.repository';

export type Credentials = {
  mail: string;
  password: string;
}

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly roles: BelongsToAccessor<Roles, typeof Usuarios.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Usuarios, dataSource);
    this.roles = this.createBelongsToAccessorFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}

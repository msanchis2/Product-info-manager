import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Permisos, PermisosRelations, RolesWithRelations} from '../models';
import {RolesRepository} from './roles.repository';

export class PermisosRepository extends DefaultCrudRepository<
  Permisos,
  typeof Permisos.prototype.id,
  PermisosRelations
> {
  rolesRepository: RolesRepository
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    // @inject('repositories.RolesRepository') rolesRepository: RolesRepository
  ) {
    super(Permisos, dataSource);
    // this.rolesRepository = rolesRepository;
  }
  async getPermissionsMatrix(): Promise<RolesWithRelations[]> {
    const relacionesRoles: RolesWithRelations = {} as RolesWithRelations;
    const permisos = await this.find()
    // const permissions = await this.find()
    // const roles = await this.rolesRepository.find()
    // Los siguientes arrays no hacen nada
    // const data = [
    //   {key: 'root', role_1: 10, role_2: 'new', role_3: 'new'},
    //   {key: 'root-productos', role_1: 11, role_2: true, role_3: false},
    //   {key: 'root-productos-index', role_1: 12, role_2: true, role_3: false},
    //   {key: 'comunicados', role_1: 10, role_2: 'new', role_3: 'new'},
    //   {key: 'comunicados-comunicados-list', role_1: 11, role_2: true, role_3: false},
    //   {key: 'pedidos-pedidos-list', role_1: 12, role_2: true, role_3: false},
    //   {key: 'pedidos-pedidos-view', role_1: 12, role_2: true, role_3: false},
    //   {key: 'pedidos-pedidos-create', role_1: 12, role_2: true, role_3: false},
    //   {key: 'Productos', role_1: 10, role_2: 'new', role_3: 'new'},
    //   {key: 'Productos-index-index', role_1: 10, role_2: 'new', role_3: 'new'},
    //   {key: 'Productos-index-view', role_1: 10, role_2: 'new', role_3: 'new'}
    // ];
    // const keys = [
    //   {key: 'root'},
    //   {key: 'root-productos'},
    //   {key: 'root-productos-index', },
    //   {key: 'comunicados'},
    //   {key: 'comunicados-comunicados-list'},
    //   {key: 'pedidos-pedidos-list'},
    //   {key: 'pedidos-pedidos-view'},
    //   {key: 'pedidos-pedidos-create'},
    //   {key: 'Productos'},
    //   {key: 'Productos-index-index'},
    //   {key: 'Productos-index-view'}
    // ];

    // const newData = data.map(row => {

    //   // row[roles.map(role => ([[`role_${role.id}`]: false])]
    //   // row[]
    //   const esto = roles.reduce((p, c): any => ([p, [[`roles${c.id}`]]]), [])
    //   return {
    //     ...row,
    //     ...esto
    //   }
    // })

    // return roles
    return [relacionesRoles]
  }
}

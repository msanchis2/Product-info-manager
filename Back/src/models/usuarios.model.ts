import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Roles} from './roles.model';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'usuarios'}}})
export class Usuarios extends Entity {
  @property({
    type: 'number',
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 2,
    mysql: {columnName: 'empresa_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  empresaId: number;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  nombre?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'mail', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  mail: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'activo_sn', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  activoSn?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'telefono', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  telefono?: string;

  @property({
    type: 'string',
    length: 250,
    mysql: {columnName: 'avatar', dataType: 'varchar', dataLength: 250, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  avatar?: string;

  @property({
    type: 'string',
    length: 250,
    mysql: {columnName: 'password', dataType: 'char', dataLength: 60, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  password: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'role', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  role: string;

  @belongsTo(() => Roles)
  rolesId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;

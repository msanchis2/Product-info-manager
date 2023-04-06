import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: true, mysql: {schema: 'pim', table: 'permisos'}}})
export class Permisos extends Entity {
  @property({
    type: 'number',
    generated: true,
    precision: 20,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'bigint', dataLength: null, dataPrecision: 20, dataScale: 0, nullable: 'N'},
  })
  id?: number;

  @property({
    type: 'string',
    length: 40,
    mysql: {columnName: 'moduleName', dataType: 'varchar', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  moduleName?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {columnName: 'controllerName', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  controllerName?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {columnName: 'actionName', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  actionName?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'rolesId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  rolesId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Permisos>) {
    super(data);
  }
}

export interface PermisosRelations {
  // describe navigational properties here
}

export type PermisosWithRelations = Permisos & PermisosRelations;

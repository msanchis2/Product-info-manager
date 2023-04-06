import {Entity, hasMany, model, property} from '@loopback/repository';
import {Permisos} from './permisos.model';

@model({settings: {idInjection: true, mysql: {schema: 'pim', table: 'roles'}}})
export class Roles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'string',
  })
  activo?: string;

  @hasMany(() => Permisos)
  permisos: Permisos[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;

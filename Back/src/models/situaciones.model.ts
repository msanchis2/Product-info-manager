import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'situaciones'}}})
export class Situaciones extends Entity {
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
    type: 'string',
    length: 45,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  nombre?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Situaciones>) {
    super(data);
  }
}

export interface SituacionesRelations {
  // describe navigational properties here
}

export type SituacionesWithRelations = Situaciones & SituacionesRelations;

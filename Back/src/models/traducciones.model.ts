import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'traducciones'}}})
export class Traducciones extends Entity {
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
    length: 5,
    mysql: {columnName: 'idioma_id', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  idiomaId: string;

  @property({
    type: 'string',
    length: 1000,
    mysql: {columnName: 'clave', dataType: 'varchar', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  clave?: string;

  @property({
    type: 'string',
    length: 1000,
    mysql: {columnName: 'valor', dataType: 'varchar', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  valor?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Traducciones>) {
    super(data);
  }
}

export interface TraduccionesRelations {
  // describe navigational properties here
}

export type TraduccionesWithRelations = Traducciones & TraduccionesRelations;

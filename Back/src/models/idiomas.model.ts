import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'idiomas'}}})
export class Idiomas extends Entity {
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

  @property({
    type: 'string',
    length: 64,
    mysql: {columnName: 'descripcion', dataType: 'varchar', dataLength: 64, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  descripcion?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'activo_sn', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  activoSn?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'locale', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  locale?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Idiomas>) {
    super(data);
  }
}

export interface IdiomasRelations {
  // describe navigational properties here
}

export type IdiomasWithRelations = Idiomas & IdiomasRelations;

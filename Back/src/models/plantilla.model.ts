import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'plantilla'}}})
export class Plantilla extends Entity {
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
    length: 30,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 30, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  nombre: string;

  @property({
    type: 'string',
    length: 30,
    mysql: {columnName: 'tabla', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  tabla: string;

  @property({
    type: 'number',
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id_empresa', dataType: 'number', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  idEmpresa: number;

  @property({
    type: 'string',
    length: 100,
    mysql: {columnName: 'cabecera', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  cabecera?: string;

  @property({
    type: 'string',
    length: 200,
    mysql: {columnName: 'descripcion', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  descripcion?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Plantilla>) {
    super(data);
  }
}

export interface PlantillaRelations {
  // describe navigational properties here
}

export type PlantillaWithRelations = Plantilla & PlantillaRelations;

import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'multimedia'}}})
export class Multimedia extends Entity {
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
    mysql: {columnName: 'empresa_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  empresaId: number;

  @property({
    type: 'string',
  })
  clave?: string;

  @property({
    type: 'string',
  })
  tipo?: string;

  constructor(data?: Partial<Multimedia>) {
    super(data);
  }
}

export interface MultimediaRelations {
  // describe navigational properties here
}

export type MultimediaWithRelations = Multimedia & MultimediaRelations;

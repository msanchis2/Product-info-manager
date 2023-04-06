import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: true, mysql: {schema: 'svan', table: 'sessions'}}})
export class Sessions extends Entity {
  @property({
    type: 'boolean',
    length: 1,
    mysql: {columnName: 'deleted', dataType: 'char', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  deleted?: boolean;

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
    length: 70,
    mysql: {columnName: 'sessionId', dataType: 'varchar', dataLength: 70, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  sessionId?: string;

  @property({
    type: 'string',
    length: 70,
    mysql: {columnName: 'hash', dataType: 'varchar', dataLength: 70, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  hash?: string;

  @property({
    type: 'date',
    mysql: {columnName: 'createdAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  createdAt?: string;

  @property({
    type: 'date',
    mysql: {columnName: 'modifiedAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  modifiedAt?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'userDeleted', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  userDeleted?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'userCreator', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  userCreator?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'userModifier', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  userModifier?: number;

  @property({
    type: 'date',
    mysql: {columnName: 'deletedAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  deletedAt?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Sessions>) {
    super(data);
  }
}

export interface SessionsRelations {
  // describe navigational properties here
}

export type SessionsWithRelations = Sessions & SessionsRelations;

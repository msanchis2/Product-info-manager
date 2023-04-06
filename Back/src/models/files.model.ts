import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: true, mysql: {schema: 'svan', table: 'files'}}})
export class Files extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    id: 1,
    generated: true,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'string',
    length: 255,
    mysql: {columnName: 'description', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  description?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {columnName: 'type', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  type?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {columnName: 'extension', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  extension?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'size', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  size?: number;

  @property({
    type: 'string',
    length: 255,
    mysql: {columnName: 'src', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  src?: string;

  @property({
    type: 'string',
    length: 70,
    mysql: {columnName: 'hash', dataType: 'varchar', dataLength: 70, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  hash?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  name?: string;

  @property({
    type: 'date',
    mysql: {columnName: 'createdAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  createdAt?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {columnName: 'title', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  title?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {columnName: 'alt', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  alt?: string;

  @property({
    type: 'date',
    mysql: {columnName: 'modifiedAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  modifiedAt?: string;

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

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'userDeleted', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  userDeleted?: number;

  @property({
    type: 'boolean',
    length: 1,
    mysql: {columnName: 'deleted', dataType: 'char', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  deleted?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Files>) {
    super(data);
  }
}

export interface FilesRelations {
  // describe navigational properties here
}

export type FilesWithRelations = Files & FilesRelations;

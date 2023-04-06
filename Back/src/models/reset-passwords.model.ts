import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: true, mysql: {schema: 'svan', table: 'reset_passwords'}}
})
export class ResetPasswords extends Entity {
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
    mysql: {columnName: 'usersId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  usersId: number;

  @property({
    type: 'string',
    length: 48,
    mysql: {columnName: 'code', dataType: 'varchar', dataLength: 48, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  code?: string;

  @property({
    type: 'date',
    required: true,
    mysql: {columnName: 'createdAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  createdAt: string;

  @property({
    type: 'date',
    mysql: {columnName: 'modifiedAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  modifiedAt?: string;

  @property({
    type: 'boolean',
    length: 1,
    mysql: {columnName: 'reset', dataType: 'char', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  reset?: boolean;

  @property({
    type: 'string',
    length: 15,
    mysql: {columnName: 'ipAddress', dataType: 'varchar', dataLength: 15, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  ipAddress?: string;

  @property({
    type: 'string',
    length: 1000,
    mysql: {columnName: 'userAgent', dataType: 'varchar', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  userAgent?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ResetPasswords>) {
    super(data);
  }
}

export interface ResetPasswordsRelations {
  // describe navigational properties here
}

export type ResetPasswordsWithRelations = ResetPasswords & ResetPasswordsRelations;

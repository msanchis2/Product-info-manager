import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: true, mysql: {schema: 'svan', table: 'password_changes'}}
})
export class PasswordChanges extends Entity {
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
    length: 15,
    mysql: {columnName: 'ipAddress', dataType: 'char', dataLength: 15, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  ipAddress?: string;

  @property({
    type: 'string',
    length: 2000,
    mysql: {columnName: 'userAgent', dataType: 'varchar', dataLength: 2000, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  userAgent?: string;

  @property({
    type: 'date',
    mysql: {columnName: 'createdAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  createdAt?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PasswordChanges>) {
    super(data);
  }
}

export interface PasswordChangesRelations {
  // describe navigational properties here
}

export type PasswordChangesWithRelations = PasswordChanges & PasswordChangesRelations;

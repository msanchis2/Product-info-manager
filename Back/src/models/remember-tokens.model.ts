import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: true, mysql: {schema: 'svan', table: 'remember_tokens'}}
})
export class RememberTokens extends Entity {
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
    length: 32,
    mysql: {columnName: 'token', dataType: 'char', dataLength: 32, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  token?: string;

  @property({
    type: 'string',
    length: 120,
    mysql: {columnName: 'userAgent', dataType: 'varchar', dataLength: 120, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  userAgent?: string;

  @property({
    type: 'date',
    required: true,
    mysql: {columnName: 'createdAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  createdAt: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RememberTokens>) {
    super(data);
  }
}

export interface RememberTokensRelations {
  // describe navigational properties here
}

export type RememberTokensWithRelations = RememberTokens & RememberTokensRelations;

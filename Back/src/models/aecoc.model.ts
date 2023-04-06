import {Model, model, property} from '@loopback/repository';

export interface Aecoc {
  itemCategoryCode: string;
}

@model()
export class Aecoc extends Model {
  @property({
    type: 'string',
    required: true,
  })
  texto: string;
  @property({
    type: 'string',
    required: true,
  })
  imagenes: string;
  @property({
    type: 'string',
    required: true,
  })
  gln: string;

  constructor(data?: Partial<Aecoc>) {
    super(data);
  }
}

import { Collection, createMSWHandlers } from './utils';

let collection = new Collection([
  {
    id: 1,
    name: 'Categoria 1',
  },
  {
    id: 2,
    name: 'Categoria 2',
  },
  {
    id: 3,
    name: 'Categoria 3',
  },
  {
    id: 4,
    name: 'Categoria 4',
  },
  {
    id: 5,
    name: 'Categoria 5',
  },
]);

const handlers = createMSWHandlers('categories', collection).toArray();

export const categoriesHandlers = handlers;

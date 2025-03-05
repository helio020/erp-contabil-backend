import type { Schema, Struct } from '@strapi/strapi';

export interface ItensItens extends Struct.ComponentSchema {
  collectionName: 'components_itens_itens';
  info: {
    displayName: 'itens';
    icon: 'shoppingCart';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'itens.itens': ItensItens;
    }
  }
}

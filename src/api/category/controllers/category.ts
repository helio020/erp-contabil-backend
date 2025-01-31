/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { name } = ctx.params;

      const category =
        await strapi.services["api::category.category"].findOne(name);

      if (!category) {
        return ctx.notFound("Categoria não encontrada");
      }

      return category;
    },
  })
);

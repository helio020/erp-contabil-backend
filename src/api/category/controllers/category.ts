/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async listAllCategories(ctx) {
      const categories =
        await strapi.services["api::category.category"].listAllCategories();

      if (!categories) {
        return ctx.notFound("Nenhuma categoria encontrada");
      }

      return categories;
    },
  })
);

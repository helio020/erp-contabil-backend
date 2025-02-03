/**
 * category service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::category.category",
  ({ strapi }) => ({
    async listAllCategories() {
      const categories = await strapi.db
        .query("api::category.category")
        .findMany({
          orderBy: [{ name: "asc" }],
        });

      return categories;
    },
  })
);

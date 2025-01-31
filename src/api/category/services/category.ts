/**
 * category service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::category.category",
  ({ strapi }) => ({
    async findOne(name) {
      const category = await strapi.db.query("api::category.category").findOne({
        where: { name },
      });

      return category;
    },
  })
);

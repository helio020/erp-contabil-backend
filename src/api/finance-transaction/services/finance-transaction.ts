/**
 * finance-transaction service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::finance-transaction.finance-transaction",
  ({ strapi }) => ({
    async find({
      page,
      perPage,
      filters,
    }: {
      page: number;
      perPage: number;
      filters: any;
    }) {
      return strapi
        .query("api::finance-transaction.finance-transaction")
        .findPage({ page, pageSize: perPage, filters });
    },

    async findOne(id: string) {
      return strapi
        .query("api::finance-transaction.finance-transaction")
        .findOne({ where: { id } });
    },

    async create(data: any) {
      return strapi
        .query("api::finance-transaction.finance-transaction")
        .create({ data });
    },

    async update(id: string, data: any) {
      return strapi
        .query("api::finance-transaction.finance-transaction")
        .update({ where: { id }, data });
    },

    async delete(id: string) {
      return strapi
        .query("api::finance-transaction.finance-transaction")
        .delete({ where: { id } });
    },
  })
);

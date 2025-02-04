/**
 * finance-transaction service
 */

import { factories } from "@strapi/strapi";

interface ListParams {
  user: string;
}

interface Transaction {
  id: string;
  title: string;
  type: string;
  amount: number;
  transaction_status: string;
  due_date: Date;
}

export default factories.createCoreService(
  "api::finance-transaction.finance-transaction",
  ({ strapi }) => ({
    async list(params: ListParams): Promise<Transaction[]> {
      const transactions = await strapi.db
        .query("api::finance-transaction.finance-transaction")
        .findMany({
          where: { user: params.user },
          populate: "*",
          orderBy: [{ due_date: "desc" }],
        });

      return transactions as Transaction[];
    },

    async create(data) {
      const transaction = await strapi.db
        .query("api::finance-transaction.finance-transaction")
        .create({
          data,
        });

      return transaction;
    },

    async update(id, data) {
      const transaction = await strapi.db
        .query("api::finance-transaction.finance-transaction")
        .update({
          where: { id },
          data,
        });

      return transaction;
    },

    async delete(id) {
      const transaction = await strapi.db
        .query("api::finance-transaction.finance-transaction")
        .delete({
          where: { id },
        });

      return transaction;
    },
  })
);

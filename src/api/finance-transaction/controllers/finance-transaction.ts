/**
 * finance-transaction controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::finance-transaction.finance-transaction",
  ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx.request;
      const { page, perPage } = query;

      return strapi.services["finance-transaction"].find({
        page,
        perPage,
      });
    },

    async findOne(ctx) {
      const { params } = ctx;
      const { id } = params;

      return strapi.services["finance-transaction"].findOne({ id });
    },

    async create(ctx) {
      const { body } = ctx.request;

      return strapi.services["finance-transaction"].create({ data: body });
    },

    async update(ctx) {
      const { params, body } = ctx;
      const { id } = params;

      return strapi.services["finance-transaction"].update({ id, data: body });
    },

    async delete(ctx) {
      const { params } = ctx;
      const { id } = params;

      return strapi.services["finance-transaction"].delete({ id });
    },

    async summary(ctx) {
      const user = ctx.state.user; // Pega o usuário autenticado

      if (!user) {
        return ctx.unauthorized("Usuário não autenticado");
      }

      // Obtém todas as transações do usuário
      const transactions = await strapi.db
        .query("api::finance-transactions.finance-transactions")
        .findMany({
          where: { user: user.id },
          select: ["type", "amount"],
        });

      // Calcula total de receitas e despesas
      const summary = transactions.reduce(
        (acc, transaction) => {
          if (transaction.type === "receita") {
            acc.receitas += transaction.amount;
          } else {
            acc.despesas += transaction.amount;
          }
          return acc;
        },
        { receitas: 0, despesas: 0 }
      );

      return {
        receitas: summary.receitas,
        despesas: summary.despesas,
        saldo: summary.receitas - summary.despesas,
      };
    },
  })
);

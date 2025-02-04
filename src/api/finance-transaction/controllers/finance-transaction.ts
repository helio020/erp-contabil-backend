/**
 * finance-transaction controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::finance-transaction.finance-transaction",
  ({ strapi }) => ({
    async summary(ctx) {
      const user = ctx.state.user; // Pega o usuário autenticado

      if (!user) {
        return ctx.unauthorized("Usuário não autenticado");
      }

      // Obtém todas as transações do usuário
      const transactions = await strapi.db
        .query("api::finance-transaction.finance-transaction")
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

    async list(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("Usuário não autenticado");
      }

      const transactions = await strapi.services[
        "api::finance-transaction.finance-transaction"
      ].find({
        user: user.id,
      });

      return transactions;
    },

    async create(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("Usuário não autenticado");
      }

      const data = ctx.request.body;

      const transaction = await strapi.services[
        "api::finance-transaction.finance-transaction"
      ].create({
        ...data,
        user: user.id,
      });

      return transaction;
    },

    async update(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("Usuário não autenticado");
      }

      const { id } = ctx.params;
      const data = ctx.request.body;

      const transaction = await strapi.services[
        "api::finance-transaction.finance-transaction"
      ].update(id, data);

      return transaction;
    },

    async delete(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("Usuário não autenticado");
      }

      const { id } = ctx.params;

      await strapi.services[
        "api::finance-transaction.finance-transaction"
      ].delete(id);

      return { ok: true };
    },
  })
);

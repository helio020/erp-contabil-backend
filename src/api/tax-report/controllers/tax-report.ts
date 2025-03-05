/**
 * tax-report controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::tax-report.tax-report", {
  async calcularApuracao(ctx: any) {
    try {
      const apuracao = await strapi.services["tax-report"].calcularApuracao();
      return apuracao;
    } catch (error) {
      return ctx.badRequest("Erro ao calcular apuração");
    }
  },
});

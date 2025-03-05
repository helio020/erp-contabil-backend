/**
 * tax-report service
 */

import { factories } from "@strapi/strapi";

interface Nota {
  total: number;
  impostos: Imposto[];
}

interface Imposto {
  id: string | number;
  documentId: string;
  locale?: string;
  createdAt?: Date;
  publishedAt?: Date;
  updatedAt?: Date;
  aliquota?: number;
  nome?: string;
  tipo?: "Estadual" | "Municipal" | "Federal";
}

interface TaxReport {
  totalReceitas: number;
  totalImpostos: number;
}

export default factories.createCoreService("api::tax-report.tax-report", {
  async calcularApuracao(ctx: any): Promise<TaxReport> {
    try {
      const notas: Nota[] = (
        await strapi.entityService.findMany("api::invoice.invoice")
      ).map((nota: any) => ({
        ...nota,
        impostos: nota.impostos || [],
      }));
      const impostos: Imposto[] = (
        await strapi.entityService.findMany("api::tax.tax")
      ).map((imposto: any) => ({
        ...imposto,
        createdAt: imposto.createdAt ? new Date(imposto.createdAt) : undefined,
        publishedAt: imposto.publishedAt
          ? new Date(imposto.publishedAt)
          : undefined,
        updatedAt: imposto.updatedAt ? new Date(imposto.updatedAt) : undefined,
      }));

      let totalReceitas = 0;
      let totalImpostos = 0;

      notas.forEach((nota) => {
        totalReceitas += nota.total;
        nota.impostos.forEach((imposto) => {
          const aliquota =
            impostos.find((i) => i.id === imposto.id)?.aliquota || 0;
          totalImpostos += nota.total * (aliquota / 100);
        });
      });

      return { totalReceitas, totalImpostos };
    } catch (error) {
      ctx.throw(500, "Erro ao calcular apuração");
    }
  },
});

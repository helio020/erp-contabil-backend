/**
 * finance-transaction router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::finance-transaction.finance-transaction",
  {
    prefix: "",
    only: ["find", "findOne", "create", "update", "delete"],
    except: [],
    config: {
      find: {},
      findOne: {},
      create: {},
      update: {},
      delete: {},
    },
  }
);

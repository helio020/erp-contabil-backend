export default {
  routes: [
    {
      method: "GET",
      path: "/finance-summary",
      handler: "finance-transaction.summary",
      config: {},
    },
    {
      method: "GET",
      path: "/list-finance-transactions",
      handler: "finance-transaction.list",
      config: {},
    },
    {
      method: "POST",
      path: "/create-finance-transaction",
      handler: "finance-transaction.create",
      config: {},
    },
  ],
};

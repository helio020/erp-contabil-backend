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
    {
      method: "PUT",
      path: "/update-finance-transaction/:id",
      handler: "finance-transaction.update",
      config: {},
    },
    {
      method: "DELETE",
      path: "/delete-finance-transaction/:id",
      handler: "finance-transaction.delete",
      config: {},
    },
  ],
};

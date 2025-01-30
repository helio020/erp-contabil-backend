export default {
  routes: [
    {
      method: "GET",
      path: "/finance-summary",
      handler: "finance-transactions.summary",
      config: {
        auth: { scope: ["authenticated"] },
      },
    },
  ],
};

export default {
  routes: [
    {
      method: "GET",
      path: "/finance-summary",
      handler: "finance-transaction.summary",
      config: {
        auth: { scope: ["authenticated"] },
      },
    },
  ],
};

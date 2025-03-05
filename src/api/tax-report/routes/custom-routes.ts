module.exports = {
  routes: [
    {
      method: "GET",
      path: "/tax-report/calculate",
      handler: "tax-report.calcularApuracao",
      config: {
        auth: false,
      },
    },
  ],
};

export default {
  routes: [
    {
      method: "GET",
      path: "/category/:name",
      handler: "category.findOne",
      config: {},
    },
  ],
};

const path = require("path");
const ConfigEnv = require("./config/config");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const mongoRoutes = require("./routes/mongoRoutes");
const postgresRoutes = require("./routes/postgresRoutes");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API-DOC Prueba de Rendimiento",
      version: "1.0.0",
      description: "API para hacer pruebas de rendimiento",
    },
    servers: [
      {
        url: "http://" + ConfigEnv.HTTP_HOST + ":" + ConfigEnv.HTTP_PORT,
      },
    ],
    components: {
    },
    security: [
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

module.exports = function (app) {
  app.use("/api", mongoRoutes, postgresRoutes);
  app.use(
    "/api-doc",
    swaggerUI.serve,
    swaggerUI.setup(swaggerJsDoc(swaggerSpec))
  );
};

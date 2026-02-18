require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml"); // mets ton fichier swagger.yaml à la racine

const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

// Middleware
//app.use(morgan('dev'));
//app.use('/uploads', express.static('uploads'));
//app.use(bodyParser.json({ limit: '50mb' }));
//app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 50000 }));

// Connexion à la base de données MongoDB
if (process.env.ENV === "dev") {
  mongoose
    .connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    )
    .then(() => console.log("✅ Connecté à la base de données"))
    .catch((err) =>
      console.log("❌ Échec de connexion à la base de données :", err),
    );
} else {
  mongoose
    .connect(process.env.URL)
    .then(() => console.log("✅ Connecté à la base de données PROD"))
    .catch((err) =>
      console.log("❌ Échec de connexion à la base de données PROD:", err),
    );
}

// Gestion CORS

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// test

app.get("/ping", (req, res) => res.status(200).send("pong"));

// Test simple de votre middleware

// Gestion des erreurs 404

const routes = require("./Routes/users")(app);

// Gestion des erreurs 404

app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.status = 404;
  next(error);
});

// Application Error handling

// Gestion globale des erreurs

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
    route: req.url,
  });
});

app.use((req, res, next) => {
  res.status(200).json({ message: "Hello world !!" });
});

module.exports = app;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

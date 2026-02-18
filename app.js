require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();

// ✅ Charge swagger.yaml (mets-le bien à la racine du projet, au même niveau que app.js/server.js)
const swaggerDocument = YAML.load("./swagger.yaml");

// ✅ Parse JSON (utile pour tes POST)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// ✅ Swagger (AVANT le 404)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Route test
app.get("/ping", (req, res) => res.status(200).send("pong"));

// ✅ MongoDB
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

// ✅ Tes routes (attention au nom du dossier Routes vs routes sur Render)
require("./Routes/users")(app);

// ✅ 404 (TOUJOURS après les routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée", route: req.url });
});

// ✅ Gestion globale des erreurs
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || "Erreur serveur",
    route: req.url,
  });
});

module.exports = app;

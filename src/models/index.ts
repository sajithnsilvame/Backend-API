import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import { Dialect } from "sequelize/types";
import configJson, { DatabaseConfig } from "../config/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configJson[env as keyof typeof configJson] as DatabaseConfig;
const db: { [key: string]: any } = {};

let sequelize: Sequelize;

// Initialize Sequelize instance
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, {
    ...config,
    dialect: config.dialect as Dialect
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      ...config,
      dialect: config.dialect as Dialect,
    }
  );
}

// Dynamically import all models in the current directory
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && // Skip hidden files
      file !== basename && // Skip this file
      file.slice(-3) === ".ts" // Include only .ts files
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Set up associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export sequelize instance and Sequelize class
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

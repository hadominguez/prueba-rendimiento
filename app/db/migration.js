const fs = require("fs");
const path = require("path");
const ConfigEnv = require("../config/config");
const logger = require("../utils/logger");
const sistemaVersiones = require("../models/sistema/sistemaVersiones");
const migrar = require("../models/sistema/migrar");
const postgres = require("../models/sistema/postgres");

const runMigration = async (filePath) => {
  const sql = fs.readFileSync(filePath, "utf-8");
  await migrar.migrar(sql);
};

const migrate = async () => {
  try {
    const tableExistsResult = await sistemaVersiones.getTablaExiste(null, null);
    const tableExists = tableExistsResult[0].existe;

    let lastVersion;
    if (tableExists) {
      const result = await sistemaVersiones.getUltimaVersion(null, null);
      lastVersion = result[0].nro_version;
    } else {
      lastVersion = "0.0.0";
    }

    const migrationFiles = await getMigrations();

    const sortedMigrations = migrationFiles
      .map((file) => ({
        fileName: file,
        version: file.replace("migration_", "").replace(".sql", ""),
      }))
      .filter(
        (migration) => compareVersions(migration.version, lastVersion) > 0
      )
      .sort((a, b) => compareVersions(a.version, b.version));

    await executeMigrations(sortedMigrations);
  } catch (error) {
    logger.error(error);
  }
};

const migrateAll = async () => {
  try {
    logger.info("Actualizar base de datos");
    const migrationFiles = await getMigrations();
    const sortedMigrations = migrationFiles
      .map((file) => ({
        fileName: file,
        version: file.replace("migration_", "").replace(".sql", ""),
      }))
      .sort((a, b) => compareVersions(a.version, b.version));
    await executeMigrations(sortedMigrations);
  } catch (error) {
    logger.error(error);
  }
};

const executeMigrations = async (sortedMigrations) => {
  for (const migration of sortedMigrations) {
    const migrationFilePath = path.join(__dirname, "seed", migration.fileName);
    await runMigration(migrationFilePath);
    logger.info(`Migración ${migration.version} ejecutada.`);
  }
};

const getMigrations = async () => {
  let files = (migrationFiles = fs
    .readdirSync(path.join(__dirname, "seed"))
    .filter((file) => file.startsWith("migration_") && file.endsWith(".sql")));
  return files;
};

function compareVersions(a, b) {
  const partsA = a.split(".").map(Number);
  const partsB = b.split(".").map(Number);

  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const partA = partsA[i] || 0;
    const partB = partsB[i] || 0;

    if (partA < partB) {
      return -1;
    } else if (partA > partB) {
      return 1;
    }
  }
  return 0;
}

const checkDatabaseExists = async () => {
  try {
    dbName = ConfigEnv.NAME_DB;
    const result = await postgres.getBaseExiste(dbName);
    if (result === 0) {
      logger.info("La base de datos no existe.");
      await postgres.createBase(dbName);
      logger.info("Base de datos creada.");

      await migrateAll();
    } else {
      await migrate();
    }
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  checkDatabaseExists,
};

const express = require('express');
const cors = require('cors');
const ConfigEnv = require('./config/config');
const logger = require('./utils/logger');
const migration = require('./db/migration');
const { registerRequest } = require('./middleware/request/requestLogger');
const app = express();

migration.checkDatabaseExists();

app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


app.use(registerRequest);

require('./routes')(app);


app.listen(
    ConfigEnv.HTTP_PORT,
    () => {
        logger.info(`Escuchando en el puerto ${ConfigEnv.HTTP_PORT}`)
    }
);
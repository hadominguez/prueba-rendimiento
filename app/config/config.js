require('dotenv').config({ path: `.env`});

const HTTP_HOST = process.env.HTTP_HOST;
const HTTP_PORT = process.env.HTTP_PORT || 3000;
const HOST_DB = process.env.HOST_DB;
const PORT_DB = process.env.PORT_DB;
const NAME_DB = process.env.NAME_DB;
const USER_DB = process.env.USER_DB;
const PASS_DB = process.env.PASS_DB || "";
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_NAME = process.env.MONGO_NAME;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;

module.exports = {
    HTTP_HOST, HTTP_PORT,
    HOST_DB, PORT_DB, NAME_DB, USER_DB, PASS_DB,
    MONGO_HOST, MONGO_PORT, MONGO_NAME, MONGO_USER, MONGO_PASS
};

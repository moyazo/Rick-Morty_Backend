const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./src/models');
const { ensureAuthentication } = require('./src/middleware/auth');
const authRoutes = require('./src/routes/auth')

const startApp = async () => {
    const app = express();
    dotenv.config();
    const port = process.env.port;

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    app.use(ensureAuthentication);
    app.use('/auth', authRoutes);

    try {
        await db.sequelize.sync({ force: false });
        app.listen(port, () => {
            console.log('APP running on port ' + port);
        });
    } catch (error) {
        console.log('Error at start up the App' + error.message);
        process.exit(1);
    }
};

startApp();
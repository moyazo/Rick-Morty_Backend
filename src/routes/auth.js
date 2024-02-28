const {signup, login} = require ('../controllers/auth');
const router = require('express').Router();



/**
 * *SIGN UP ENDPOINT*
 * *localhost:8000/auth/signup*
 * @param {Request} request
 * @param {Response} response
 * @returns {String}
 */
router.post('/signup', async (request, response) => {
    try {
        const { email, password, userName }= request.body;
        if (!email || !password) {
            response.status(502).json('Email or Password not found');
        }
        const signData = { email, password, userName };
        const token = await signup(signData);
        response.status(200).json(token);
    } catch (error) {
        response.status(500).json('Error at Sign up' + error);
    }
});
/**
 * *LOGIN UP ENDPOINT*
 * *localhost:8000/auth/login*
 * @param {Request} request
 * @param {Response} response
 * @returns {String}
 */
router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            response.status(502).json('Incorrect data');
        }
        const signData = { email, password};
        const token = await login(signData);
        response.status(200).json(token);
    } catch (error) {
        response.status(500).json(error.message);
    }
});

module.exports = router;
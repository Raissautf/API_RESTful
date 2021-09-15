const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth')
const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
    return  jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}
 // rota de registro
router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne( { email }))
            return res.status (400).json({ mensagem: 'E-mail já existente.' });

        const user = await User.create(req.body);

        user.senha = undefined; 

        return res.json( {
             user, 
             token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).json({ mensagem: 'Falha no registro.' })
    }
});
 // rota de autenticação
router.post('/authenticate', async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ email }).select('+senha'); 
    if (!user)
        return res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos'});

    if(!await bcrypt.compare(senha, user.senha))
        return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos'});

    user.senha = undefined;

    res.json({ 
      user,
      token: generateToken({ id: user.id }),
     });
});

module.exports = app => app.use('/auth', router);
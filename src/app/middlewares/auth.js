const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => { 
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).json({ mensagem: 'Não autorizado' });

    const parts = authHeader.split(' ');
  
    if (!parts.length === 2)
        return res.status(401).json({ mensagem: 'Não autorizado' });

    const [ scheme, token ] = parts;
   
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ mensagem:'Não autorizado' });
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).json({ mensagem: 'Não autorizado'});
        req.useId = decoded.id; 
    
        if (decoded.expiresIn < Date.now()) {
        return res.status(401).json({ mensagem: 'Sessão inválida.' });
        }
        req.useId = decoded.id; 
        req.useName = decoded.name;
        req.useEmail = decoded.senha;

        return next();
  
    });
};
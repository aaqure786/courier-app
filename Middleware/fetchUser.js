const jwt = require('jsonwebtoken');
const JWT_SECRET = "JWT12354";

const fetchUser = (req, res, next)=> {

    const token = req.header('token');
    if(!token){
        res.status(401).send({error: "Please authenticate with a valid token"})
    }

    try {
        const data = jwt.verify(token,JWT_SECRET);
    req.user = data;
    next();

    } catch (error) {
        res.status(401).send({error: "Please authenticate with a valid token"})
    }
    

}


module.exports = fetchUser

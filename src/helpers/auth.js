const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (typeof header !== 'undefined') {
    const header2 = header.split(' ');
    const headerToken = header2[1];
    req.token = headerToken;
    next();
  } else {
    res.status(403).send({ message: 'Unauthorized access' });
  }
};

export default verifyToken;

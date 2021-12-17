const db = require("../_helpers/db");
const crypto = require("crypto");
const User = db.User;

module.exports = {
  authenticate,
  create,
};
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return { hash: hash, salt: salt };
};

const comparePassword = (password, hash, salt) => {
  return (
    hash ===
    crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
  );
};  

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && comparePassword(password, user.hash, user.salt)) {
    return {
      ...user.toJSON(),
    };
  }
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    const { hash, salt } = hashPassword(userParam.password);
    user.hash = hash;
    user.salt = salt;
  }
  console.log(JSON.stringify(user));

  // save user
  await user.save();
}

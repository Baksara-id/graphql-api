const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { RiwayatBelajar } = require("./../models");

const users = async (_, __, { User }) => {
  return await User.findAll({
    include: {
      all: true,
      required: false,
    },
  })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

const user = async (_, { id }, { User }) => {
  return await User.findOne({
    where: {
      id: id,
    },
    include: [
      {
        all: true,
        required: false,
      },
    ],
  })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      throw new ApolloError(err);
    });
};

const createUser = async (_, { name, email, password }, { User }) => {
  const oldUser = await User.findOne({ where: { email } });
  if (oldUser) {
    throw new ApolloError(
      "Email sudah terdaftar with the email" + email,
      "USER_ALREADY_EXISTS"
    );
  }
  var encryptedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    name: name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });
  const token = jwt.sign({ user_id: newUser.id, email }, "baksaratampan", {
    expiresIn: "2h",
  });
  newUser.token = token;
  const res = await newUser.save();
  return {
    id: res.id,
    name: res.name,
    email: res.email,
    token: res.token,
  };
};

const loginUser = async (_, { email, password }, { User }) => {
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ user_id: user.id, email }, "baksaratampan", {
      expiresIn: "2h",
    });
    user.token = token;
    const res = await user.save();
    return User.findByPk(res.id, {
      include: [
        {
          all: true,
          required: false,
        },
        {
          model: RiwayatBelajar,
          as: "riwayat_belajars",
          required: false,
          order: [
            ["nomor_modul", "DESC"],
            ["nomor_pelajaran", "DESC"],
          ],
          limit: 1,
        }
      ],
    });
  }
  throw new ApolloError("Invalid credentials", "INVALID_CREDENTIALS");
};

const logoutUser = async (_, { id }, { User }) => {
  await User.update({ token: null }, { where: { id } });
  return true;
};

const updateUser = async (
  _,
  args,
  // { id, name, email, password, exp, level, jumlah_scan },
  { User }
) => {
  const id = args.id;
  const user = await User.findByPk(id, {
    include: [
      {
        all: true,
        required: false,
      },
    ],
  });
  Object.keys(args).forEach(async (key) => {
    if (args[key] !== null && key !== "id") {
      user[key] = args[key];
      await user.save();
    }
  });
  return await user;
};

const createUserLencana = async (
  _,
  { user_id, lencana_id },
  { User, Lencana }
) => {
  const user = await User.findByPk(user_id);
  const lencana = await Lencana.findByPk(lencana_id);
  user.addLencanas(lencana);
  return await User.findOne({
    where: { id: user_id },
    include: {
      all: true,
      required: false,
    },
  });
};

const createUserLevel = async (_, { user_id, level_id }, { UserLevel }) => {
  return await UserLevel.create({ user_id, level_id });
};

module.exports = {
  users,
  user,
  createUser,
  loginUser,
  updateUser,
  createUserLencana,
  createUserLevel,
  logoutUser,
};

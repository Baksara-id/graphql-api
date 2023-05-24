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

const user = async (_, { id }) => {
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
  return await User.create({ name, email, password });
};
const updateUser = async (
  _,
  { id, name, email, password, exp, level, jumlah_scan },
  { User }
) => {
  await User.update(
    { name, email, password, exp, level, jumlah_scan },
    { where: { id } }
  );
  return await User.findByPk(id);
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
  updateUser,
  createUserLencana,
  createUserLevel,
};

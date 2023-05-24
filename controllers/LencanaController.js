const {
  User,
} = require("./../models");

const lencanas = async (_, __, { Lencana }) => {
  return await Lencana.findAll({
    include: {
      model: User,
      as: "users",
      required: false,
    },
  })
    .then((lencanas) => {
      // console.log(lencanas);
      return lencanas;
    })
    .catch((err) => {
      // console.log(err);
      throw new ApolloError(err);
    });
};
const lencana = async (_, { id }, { Lencana }) => {
  return await Lencana.findOne({
    where: {
      id: id,
    },
    include: {
      all: true,
      required: false,
    },
  })
    .then((lencana) => {
      // console.log(lencana);
      return lencana;
    })
    .catch((err) => {
      // console.log(err);
      throw new ApolloError(err);
    });
};

const createLencana = async (_, { nama, url_gambar }, { Lencana }) => {
  return await Lencana.create({ nama, url_gambar });
};

const user_lencanas = async (_, { user_id }, { User, Lencana }) => {
  const user = await User.findByPk(user_id, {
    include: {
      model: Lencana,
      as: "lencanas",
      required: false,
      order: [["id", "ASC"]],
    },
  });

  // user.lencanas.forEach((element) => {
  //   console.log(element.id);
  // });
  return user.lencanas;
};

module.exports = {
  lencanas: lencanas,
  lencana: lencana,
  createLencana: createLencana,
  user_lencanas: user_lencanas,
};

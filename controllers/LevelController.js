const levels = async (_, __, { Level }) => {
  return await Level.findAll({
    include: {
      all: true,
      required: false,
    },
  })
    .then((levels) => {
      // console.log(levels);
      return levels;
    })
    .catch((err) => {
      // console.log(err);
      throw new ApolloError(err);
    });
};
const level = async (_, { id }, { Level }) => {
  return await Level.findOne({
    where: {
      id: id,
    },
    include: {
      all: true,
      required: false,
    },
  })
    .then((level) => {
      return level;
    })
    .catch((err) => {
      throw new ApolloError(err);
    });
};
const createLevel = async (_, { nama }, { Level }) => {
  const level = await Level.create({ nama });

  return level.reload({
    include: {
      all: true,
      required: false,
    },
  });
};

module.exports = {
    levels: levels,
    level: level,
    createLevel: createLevel,
};

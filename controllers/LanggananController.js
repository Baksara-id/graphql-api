const langganans = async (_, __, { Langganan }) => {
  return await Langganan.findAll({
    include: {
      all: true,
      required: false,
    },
  })
    .then((langganans) => {
      // console.log(langganans);
      return langganans;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

const langganan = async (_, { id }, { Langganan }) => {
  return await Langganan.findOne({
    where: {
      id: id,
    },
    include: {
      all: true,
      required: false,
    },
  })
    .then((langganan) => {
      // console.log(langganan);
      return langganan;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

module.exports = {
    langganans,
    langganan,
};

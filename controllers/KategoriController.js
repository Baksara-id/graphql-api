const kategoris = async (_, __, { Kategori }) => {
  return await Kategori.findAll({
    include: {
      all: true,
      required: false,
    },
  })
    .then((kategoris) => {
      // console.log(kategoris);
      return kategoris;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

const kategori = async (_, { id }, { Kategori }) => {
  return await Kategori.findOne({
    where: {
      id: id,
    },
    include: {
      all: true,
      required: false,
    },
  })
    .then((kategori) => {
      // console.log(kategori);
      return kategori;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

module.exports = {
  kategoris,
  kategori,
};

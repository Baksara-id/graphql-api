const { Op } = require("sequelize");

const ceritas = async (_, __, { Cerita }) => {
  return await Cerita.findAll()
    .then((ceritas) => {
      // console.log(ceritas);
      return ceritas;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

const cerita = async (_, { id }, { Cerita }) => {
  return await Cerita.findOne({
    where: {
      id: id,
    },
  })
    .then((cerita) => {
      // console.log(cerita);
      return cerita;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

const createCerita = async (_, { judul, deskripsi, url_isi, url_gambar }, { Cerita }) => {
  return await Cerita.create({ judul, deskripsi, url_isi, url_gambar });
};

module.exports = {
  ceritas,
  cerita,
  createCerita,
};

const { Op } = require("sequelize");

const artikels = async (_, __, { Artikel }) => {
  return await Artikel.findAll({
    include: {
      all: true,
      required: false,
    },
  })
    .then((artikels) => {
      console.log(artikels);
      return artikels;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

const artikel = async (_, { id }, { Artikel }) => {
  return await Artikel.findOne({
    where: {
      id: id,
    },
    include: {
      all: true,
      required: false,
    },
  })
    .then((artikel) => {
      // console.log(artikel);
      return artikel;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

const createArtikel = async( _, { judul, kategori_id, isi, url_gambar }, { Artikel }) => {
  const artikel = await Artikel.create({
    judul,
    kategori_id,
    isi,
    url_gambar,
  });

  const returnArtikel = await Artikel.findOne({
    where: { id: artikel.id },
    include: {
      all: true,
      required: false,
    },
  });

  return returnArtikel;
};

const updateArtikel = async( _, { id, judul, deskripsi, kategori_id, isi, url_gambar }, { Artikel } ) => {
  await Artikel.update(
    { judul, deskripsi, kategori_id, isi, url_gambar },
    { where: { id } }
  );
  return await Artikel.findOne({
    where: { id },
    include: {
      all: true,
      required: false,
    },
  });
};

  module.exports = {
    artikels,
    artikel,
    createArtikel,
    updateArtikel,
  };
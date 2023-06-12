const { Op } = require("sequelize");

const convertTimeStamp = async(assignedDate) => {
  const d = new Date(assignedDate);
  return await `${d.getFullYear()}-${('0' + d.getMonth()).slice(-2)}-${('0' + d.getDate()).slice(-2)} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${('0' + d.getSeconds()).slice(-2)}`;
}

const artikels = async (_, __, { Artikel }) => {
  const result = [];
  return await Artikel.findAll({
    include: {
      all: true,
      required: false,
    },
  })
    .then((artikels) => {
      // console.log(artikels);
      artikels.forEach(element => {
        /* 
          MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
             + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
             + MyDate.getFullYear();
        */
        date_string = convertTimeStamp(element.createdAt);
        date_string2 = convertTimeStamp(element.updatedAt);
        // element.createdAt = date_string;
        result.push({
          id: element.id,
          judul: element.judul,
          isi: element.isi,
          url_gambar: element.url_gambar,
          createdAt: date_string,
          updatedAt: date_string2
        })
        
      });
      return result;
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
      return {
        id: artikel.id,
        judul: artikel.judul,
        isi: artikel.isi,
        url_gambar: artikel.url_gambar,
        createdAt: convertTimeStamp(artikel.createdAt),
        updatedAt: convertTimeStamp(artikel.updatedAt)
      };
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
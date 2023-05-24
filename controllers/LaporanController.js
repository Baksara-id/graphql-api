const laporans = async (_, __, { Laporan }) => {
  return await Laporan.findAll({
    include: {
      model: User,
      as: "user",
    },
  })
    .then((laporans) => {
      // console.log(laporans);
      return laporans;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

const laporan = async (_, { id }, { Laporan }) => {
  return await Laporan.findOne({
    where: {
      id: id,
    },
    include: {
      model: User,
      as: "user",
      required: false,
    },
  })
    .then((laporan) => {
      // console.log(laporan);
      return laporan;
    })
    .catch((err) => {
      console.log(err);
      throw new ApolloError(err);
    });
};

const createLaporan = async (_, { user_id, judul, isi }, { Laporan }) => {
  return await Laporan.create({ user_id, judul, isi });
};

const updateLaporan = async (_, { id, user_id, judul, isi }, { Laporan }) => {
  await Laporan.update({ user_id, judul, isi }, { where: { id } });
  return await Laporan.findByPk(id);
};

module.exports = {
    laporans,
    laporan,
    createLaporan,
    updateLaporan,
};

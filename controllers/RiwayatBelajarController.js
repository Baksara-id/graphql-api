const {
  User,
} = require("./../models");

const riwayat_belajars = async (_, __, { RiwayatBelajar }) => {
  return await RiwayatBelajar.findAll({
    include: {
      model: User,
      as: "user",
      required: false,
    },
  })
    .then((riwayat_belajars) => {
      // console.log(riwayat_belajars);
      return riwayat_belajars;
    })
    .catch((err) => {
      // console.log(err);
      throw new ApolloError(err);
    });
};
const riwayat_belajar = async (_, { user_id }, { RiwayatBelajar }) => {
  return await RiwayatBelajar.findOne({
    where: {
      user_id: user_id,
    },
    order: [
      ["nomor_modul", "DESC"],
      ["nomor_pelajaran", "DESC"],
    ],
    include: {
      model: User,
      as: "user",
      required: false,
    },
  })
    .then((riwayat_belajar) => {
      // console.log(riwayat_belajar);
      return riwayat_belajar;
    })
    .catch((err) => {
      // console.log(err);
      throw new ApolloError(err);
    });
  // [0]
  // return riwayat;
};
const createRiwayatBelajar = async (
  _,
  { user_id, nomor_modul, nomor_pelajaran },
  { RiwayatBelajar }
) => {
  const c = await RiwayatBelajar.create({
    user_id,
    nomor_modul,
    nomor_pelajaran,
    // include : {
    //   model: User,
    //   as: "user",
    // }
  });
  return await c.reload({
    include: {
      model: User,
      as: "user",
    },
  });
};

module.exports = {
    riwayat_belajars: riwayat_belajars,
    riwayat_belajar: riwayat_belajar,
    createRiwayatBelajar: createRiwayatBelajar,
};

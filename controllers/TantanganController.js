const { Op } = require("sequelize");

const tantangans = async (_, { user_id }, { User, Tantangan }) => {
  const user = await User.findByPk(user_id, {
    include: {
      model: Tantangan,
      as: "tantangans",
      required: false,
    },
  });
  // console.log(user.tantangans);
  const tantangan_ids = [];
  user.tantangans.forEach((element) => {
    tantangan_ids.push(element.id);
  });

  const tantangans = await Tantangan.findAll({
    where: {
      id: {
        [Op.notIn]: tantangan_ids,
      },
    },
    include: {
      all: true,
      required: false,
    },
  });
  return tantangans;
};

const getTantangans = async (_, { user_id }, { User, Tantangan }) => {
  const user = await User.findByPk(user_id, {
    include: {
      model: Tantangan,
      as: "tantangans",
      required: false,
    },
  });
  // console.log(user.tantangans);
  const tantangan_ids = [];
  user.tantangans.forEach((element) => {
    tantangan_ids.push(element.id);
  });

  const tantangans = await Tantangan.findAll({
    where: {
      id: {
        [Op.notIn]: tantangan_ids,
      },
    },
    limit: 3,
    include: {
      all: true,
      required: false,
    },
  });
  return tantangans;
};

const riwayat_tantangans = async (
  _,
  { user_id },
  { Tantangan, UserTantangan }
) => {
  const user_tantangan = await UserTantangan.findAll({
    where: {
      user_id: user_id,
    },
    order: [["tantangan_id", "ASC"]],
  });

  // const tantangans = [];
  const returnTantangans = [];
  const tantangan_id = [];
  user_tantangan.forEach((element) => {
    tantangan_id.push(element.tantangan_id);
  });

  console.log(tantangan_id);

  const tantangans = await Tantangan.findAll({
    where: {
      id: {
        [Op.in]: tantangan_id,
      },
    },
    order: [["id", "ASC"]],
    include: {
      all: true,
      required: false,
    },
  });

  console.log(tantangans);

  for (let i = 0 ; i < user_tantangan.length ; i++) {
    returnTantangans.push({
      id: tantangans[i].id,
      nama: tantangans[i].nama,
      exp: tantangans[i].exp,
      soal: tantangans[i].soal,
      pertanyaan: tantangans[i].pertanyaan,
      kunci_jawaban: tantangans[i].kunci_jawaban,
      url_gambar: tantangans[i].url_gambar,
      is_approved: user_tantangan[i].is_approved,
    });
  }


  return returnTantangans;

  
  // console.log(tantangan_ids);
 /*  tantangans.forEach((element) => {
    element.is_approved = bool[count];
    count++;
  }); */
};

const tantangan = async (_, { id }, { Tantangan }) => {
  return await Tantangan.findOne({
    where: {
      id: id,
    },
    include: {
      all: true,
      required: false,
    },
  })
    .then((tantangan) => {
      // console.log(tantangan);
      return tantangan;
    })
    .catch((err) => {
      // console.log(err);
      throw new ApolloError(err);
    });
};

const createTantangan = async (
  _,
  { nama, exp, soal, pertanyaan, kunci_jawaban, url_gambar },
  { Tantangan }
) => {
  return await Tantangan.create({
    nama,
    exp,
    soal,
    pertanyaan,
    kunci_jawaban,
    url_gambar,
  });
};

const updateTantangan = async (
  _,
  { id, nama, exp, soal, pertanyaan, kunci_jawaban, url_gambar },
  { Tantangan }
) => {
  await Tantangan.update(
    { nama, deskripsi, exp, soal, pertanyaan, kunci_jawaban, url_gambar },
    { where: { id } }
  );
  return await Tantangan.findOne({
    where: { id },
    include: {
      all: true,
      required: false,
    },
  });
};

module.exports = {
    tantangans,
    getTantangans,
    riwayat_tantangans,
    tantangan,
    createTantangan,
    updateTantangan,
};


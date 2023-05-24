const b = require('./controllers/bootstrap');

const resolvers = {
  Query: {
    users: b.users,
    user: b.user,

    levels: b.levels,
    level: b.level,

    riwayat_belajars: b.riwayat_belajars,
    riwayat_belajar: b.riwayat_belajar,

    lencanas: b.lencanas,
    lencana: b.lencana,

    tantangans: b.tantangans,
    tantangan: b.tantangan,
    getTantangans: b.getTantangans,
    riwayat_tantangans: b.riwayat_tantangans,

    user_lencanas: b.user_lencanas,

    user_tantangans: b.user_tantangans,
    user_tantangan: b.user_tantangan,

    ceritas: b.ceritas,
    cerita: b.cerita,

    artikels: b.artikels,
    artikel: b.artikel,

    kategoris: b.kategoris,
    kategori: b.kategori,

    laporans: b.laporans,
    laporan: b.laporan,

    langganans: b.langganans,
    langganan: b.langganan,
  },
  Mutation: {
    createUser: b.createUser,
    loginUser: b.loginUser,
    updateUser: b.updateUser,
    createLevel: b.createLevel,
    createRiwayatBelajar: b.createRiwayatBelajar,

    createUserLencana: b.createUserLencana,

    createLencana: b.createLencana,
    createUserTantangan: b.createUserTantangan,

    createTantangan: b.createTantangan,
    updateTantangan: b.updateTantangan,

    createUserLevel: b.createUserLevel,

    createArtikel: b.createArtikel,
    updateArtikel: b.updateArtikel,

    createCerita: b.createCerita,

    createLaporan: b.createLaporan,
    updateLaporan: b.updateLaporan,
  },
};

module.exports = resolvers;

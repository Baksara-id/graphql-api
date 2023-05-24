const {
  users,
  user,
  createUser,
  loginUser,
  updateUser,
  createUserLencana,
  createUserLevel,
} = require('./UserController');

const { levels, level, createLevel } = require('./LevelController');

const {
  riwayat_belajars,
  riwayat_belajar,
  createRiwayatBelajar,
} = require('./RiwayatBelajarController');

const {
  lencanas,
  lencana,
  user_lencanas,
  createLencana,
} = require('./LencanaController');

const {
  tantangans,
  tantangan,
  getTantangans,
  createTantangan,
  updateTantangan,
  riwayat_tantangans,
} = require('./TantanganController');

const {
  user_tantangans,
  user_tantangan,
  createUserTantangan,
} = require('./UserTantanganController');

const {
  createArtikel,
  updateArtikel,
  artikel,
  artikels,
} = require('./ArtikelController');

const { ceritas, cerita, createCerita } = require('./CeritaController');

const { kategoris, kategori } = require('./KategoriController');

const {
  createLaporan,
  updateLaporan,
  laporans,
  laporan,
} = require('./LaporanController');

const { langganans, langganan } = require('./LanggananController');

module.exports = {
  users,
  user,
  createUser,
  loginUser,
  updateUser,
  createUserLencana,
  createUserLevel,
  levels,
  level,
  createLevel,
  riwayat_belajars,
  riwayat_belajar,
  createRiwayatBelajar,
  lencanas,
  lencana,
  user_lencanas,
  createLencana,
  tantangans,
  tantangan,
  getTantangans,
  createTantangan,
  updateTantangan,
  riwayat_tantangans,
  user_tantangans,
  user_tantangan,
  createUserTantangan,
  createArtikel,
  updateArtikel,
  artikel,
  artikels,
  ceritas,
  cerita,
  createCerita,
  kategoris,
  kategori,
  createLaporan,
  updateLaporan,
  laporans,
  laporan,
  langganans,
  langganan,
};

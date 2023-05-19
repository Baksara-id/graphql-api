const { Level } = require("./models");

const resolvers = {
  Query: {
    async users(_, __, { User }) {
      // console.log(s);
      return await User.findAll({
        // terus tak tambahi include iki pas query
        include: [
          {
            model: Level,
            as: "levels",
          },
          {
            model: Laporan,
            as: "laporans",
          },
          {
            model: Langganan,
            as: "langganans",
          },
          {
            model: RiwayatBelajar,
            as: "riwayat_belajars",
          },
          {
            model: Lencana,
            as: "lencanas",
          },
          {
            model: Tantangan,
            as: "tantangans",
          },
        ],
      });
    },

    async user(_, { id }) {
      return await User.findAll({
        where: {
          id: id,
        },
        include: [
          {
            model: Level,
            as: "levels",
          },
          {
            model: Laporan,
            as: "laporans",
          },
          {
            model: Langganan,
            as: "langganans",
          },
          {
            model: RiwayatBelajar,
            as: "riwayat_belajars",
          },
          {
            model: Lencana,
            as: "lencanas",
          },
          {
            model: Tantangan,
            as: "tantangans",
          },
        ],
      });
    },
    async levels(_, __, { Level }) {
      return await Level.findAll();
    },
    async user_levels(_, __, { UserLevel }) {
      return await UserLevel.findAll();
    },
    async riwayat_belajars(_, __, { RiwayatBelajar }) {
      return await RiwayatBelajar.findAll({
        include: {
          model: User,
          as: "user",
        },
      });
    },
    async riwayat_belajar(_, { user_id }, { RiwayatBelajar }) {
      return await RiwayatBelajar.findAll({
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
        },
      })[0];
    },

    async lencanas(_, __, { Lencana }) {
      return await Lencana.findAll({
        include: {
          model: User,
          as: "users",
        },
      });
    },
    async lencana(_, { id }, { Lencana }) {
      return await Lencana.findAll({
        where: {
          id: id,
        },
        include: {
          model: User,
          as: "users",
        },
      });
    },

    async tantangans(_, __, { Tantangan }) {
      return await Tantangan.findAll({
        include: {
          model: User,
          as: "users",
        },
      });
    },

    async tantangan(_, { id }, { Tantangan }) {
      return await Tantangan.findAll({
        where: {
          id: id,
        },
        include: {
          model: User,
          as: "users",
        },
      });
    },

    async user_tantangans(_, __, { UserTantangan }) {
      return await UserTantangan.findAll();
    },

    async user_tantangan(_, { user_id }, { UserTantangan }) {
      return await UserTantangan.findAll({
        where: {
          user_id: user_id,
        },
        include: {
          model: User,
          as: "user",
        },
      });
    },

    async ceritas(_, __, { Cerita }) {
      return await Cerita.findAll();
    },

    async cerita(_, { id }, { Cerita }) {
      return await Cerita.findAll({
        where: {
          id: id,
        },
      });
    },

    async artikels(_, __, { Artikel }) {
      return await Artikel.findAll();
    },

    async artikel(_, { id }, { Artikel }) {
      return await Artikel.findAll({
        where: {
          id: id,
        },
      });
    },

    async kategoris(_, __, { Kategori }) {
      return await Kategori.findAll();
    },

    async kategori(_, { id }, { Kategori }) {
      return await Kategori.findAll({
        where: {
          id: id,
        },
      });
    },

    async laporans(_, __, { Laporan }) {
      return await Laporan.findAll();
    },

    async laporan(_, { id }, { Laporan }) {
      return await Laporan.findAll({
        where: {
          id: id,
        },
      });
    },

    async langganans(_, __, { Langganan }) {
      return await Langganan.findAll();
    },

    async langganan(_, { id }, { Langganan }) {
      return await Langganan.findAll({
        where: {
          id: id,
        },
      });
    },
  },
  Mutation: {
    async createUser(_, { name, email, password }, { User }) {
      return await User.create({ name, email, password });
    },
    async updateUser(
      _,
      { id, name, email, password, exp, level, jumlah_scan },
      { User }
    ) {
      await User.update(
        { name, email, password, exp, level, jumlah_scan },
        { where: { id } }
      );
      return await User.findByPk(id);
    },

    async createRiwayatBelajar(
      _,
      { user_id, nomor_modul, nomor_pelajaran },
      { RiwayatBelajar }
    ) {
      return await RiwayatBelajar.create({
        user_id,
        nomor_modul,
        nomor_pelajaran,
      });
    },

    async createUserLencana(_, { user_id, lencana_id }, { User }) {
      User.addLencanas(user_id, lencana_id);
      return await User.findAll({
        where: { user_id },
        include: [
          {
            model: Level,
            as: "levels",
          },
          {
            model: Laporan,
            as: "laporans",
          },
          {
            model: Langganan,
            as: "langganans",
          },
          {
            model: RiwayatBelajar,
            as: "riwayat_belajars",
          },
          {
            model: Lencana,
            as: "lencanas",
          },
          {
            model: Tantangan,
            as: "tantangans",
          },
        ],
      });
    },
    // async deleteUser(_, { id }, { User }) {
    //   await User.destroy({ where: { id } });
    //   return true;
    // },

    async createLencana(_, { nama, url_gambar }, { Lencana }) {
      return await Lencana.create({ nama, url_gambar });
    },

    async createUserTantangan(_, { user_id, tantangan_id }, { UserTantangan }) {
      return await UserTantangan.create({ user_id, tantangan_id });
    },

    async updateUserTantangan(
      _,
      { user_id, tantangan_id, jawaban },
      { UserTantangan }
    ) {
      const tantangan = await Tantangan.findByPk(tantangan_id);

      if (tantangan.jawaban.toLowerCase() === jawaban.toLowerCase()) {
        await UserTantangan.update(
          { user_id, tantangan_id, jawaban, is_approved: true },
          { where: { user_id, tantangan_id } }
        );
      }
      return await UserTantangan.findByPk(user_id, tantangan_id);
    },

    async createTantangan(
      _,
      { nama, exp, soal, pertanyaaan, kunci_jawaban, url_gambar },
      { Tantangan }
    ) {
      return await Tantangan.create({
        nama,
        exp,
        soal,
        pertanyaaan,
        kunci_jawaban,
        url_gambar,
      });
    },

    async updateTantangan(
      _,
      { id, nama, exp, soal, pertanyaaan, kunci_jawaban, url_gambar },
      { Tantangan }
    ) {
      await Tantangan.update(
        { nama, deskripsi, exp, soal, pertanyaaan, kunci_jawaban, url_gambar },
        { where: { id } }
      );
      return await Tantangan.findByPk(id);
    },

    async createLevel(_, { nama }, { Level }) {
      return await Level.create({ nama });
    },
    /* async updateLevel(_, { id, nama }, { Level }) {
      await Level.update({ nama }, { where: { id } });
      return await Level.findByPk(id);
    },
    async deleteLevel(_, { id }, { Level }) {
      await Level.destroy({ where: { id } });
      return true;
    }, */
    async createUserLevel(_, { user_id, level_id }, { UserLevel }) {
      return await UserLevel.create({ user_id, level_id });
    },
    /* async updateUserLevel(_, { user_id, level_id }, { UserLevel }) {
      await UserLevel.update(
        { user_id, level_id },
        { where: { user_id, level_id } }
      );
      return await UserLevel.findByPk(user_id, level_id);
    }, 
    async deleteUserLevel(_, { user_id, level_id }, { UserLevel }) {
      await UserLevel.destroy({ where: { user_id, level_id } });
      return true;
    },
    */

    async createCerita(
      _,
      { judul, deskripsi, url_isi, url_gambar },
      { Cerita }
    ) {
      return await Cerita.create({ judul, deskripsi, url_isi, url_gambar });
    },

    async createArtikel(
      _,
      { judul, deskripsi, kategori_id, isi, url_gambar },
      { Artikel }
    ) {
      return await Artikel.create({
        judul,
        kategori_id,
        isi,
        url_gambar,
      });
    },

    async updateArtikel(
      _,
      { id, judul, deskripsi, kategori_id, isi, url_gambar },
      { Artikel }
    ) {
      await Artikel.update(
        { judul, deskripsi, kategori_id, isi, url_gambar },
        { where: { id } }
      );
      return await Artikel.findByPk(id);
    },

    async createLaporan(_, { user_id, judul, isi }, { Laporan }) {
      return await Laporan.create({ user_id, judul, isi });
    },

    async updateLaporan(_, { id, user_id, judul, isi }, { Laporan }) {
      await Laporan.update({ user_id, judul, isi }, { where: { id } });
      return await Laporan.findByPk(id);
    },
  },
};

module.exports = resolvers;

const {
  Level,
  Laporan,
  Langganan,
  RiwayatBelajar,
  Lencana,
  Tantangan,
  User,
} = require("./models");

const { Op } = require("sequelize");

// const { UserInputError } = require('graphql');
// const { Level } = require("./models");
const { ApolloError } = require("apollo-server-errors");

const resolvers = {
  Query: {
    async users(_, __, { User }) {
      // console.log(s);
      return await User.findAll({
        // terus tak tambahi include iki pas query
        include: {
          all: true,
          required: false,
        },
      })
        .then((users) => {
          // console.log(users);
          return users;
        })
        .catch((err) => {
          console.log(err);
          throw new ApolloError(err);
        });
    },

    async user(_, { id }) {
      // console.log(id);
      // if (id == null) {
      //   throw new ApolloError('id tidak boleh kosong', 'ID_NOT_FOUND');
      // }
      // const queue =
      return await User.findOne({
        where: {
          id: id,
        },
        include: [
          {
            all: true,
            required: false,
          },
        ],
      })
        .then((user) => {
          // console.log(user);
          return user;
        })
        .catch((err) => {
          // console.log(err.message);
          throw new ApolloError(err);
        });
      // console.log(queue);
      // return queue;
    },
    async levels(_, __, { Level }) {
      return await Level.findAll({
        include: {
          all: true,
          required: false,
        },
      })
        .then((levels) => {
          // console.log(levels);
          return levels;
        })
        .catch((err) => {
          // console.log(err);
          throw new ApolloError(err);
        });
    },
    async level(_, { id }, { Level }) {
      return await Level.findOne({
        where: {
          id: id,
        },
        include: {
          all: true,
          required: false,
        },
      })
        .then((level) => {
          // console.log(level);
          return level;
        })
        .catch((err) => {
          // console.log(err);
          throw new ApolloError(err);
        });
    },
    // async user_levels(_, __, { UserLevel }) {
    //   return await UserLevel.findAll()
    //     .then((user_levels) => {
    //       // console.log(user_levels);
    //       return user_levels;
    //     })
    //     .catch((err) => {
    //       // console.log(err);
    //       throw new ApolloError(err);
    //     });
    // },
    async riwayat_belajars(_, __, { RiwayatBelajar }) {
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
    },
    async riwayat_belajar(_, { user_id }, { RiwayatBelajar }) {
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
    },

    async lencanas(_, __, { Lencana }) {
      return await Lencana.findAll({
        include: {
          model: User,
          as: "users",
          required: false,
        },
      })
        .then((lencanas) => {
          // console.log(lencanas);
          return lencanas;
        })
        .catch((err) => {
          // console.log(err);
          throw new ApolloError(err);
        });
    },
    async lencana(_, { id }, { Lencana }) {
      return await Lencana.findOne({
        where: {
          id: id,
        },
        include: {
          all: true,
          required: false,
        },
      })
        .then((lencana) => {
          // console.log(lencana);
          return lencana;
        })
        .catch((err) => {
          // console.log(err);
          throw new ApolloError(err);
        });
    },

    async tantangans(_, { user_id }, { User, Tantangan }) {
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
    },

    async getTantangans(_, { user_id }, { User, Tantangan }) {
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
    },

    async riwayat_tantangans(
      _,
      { user_id },
      { Tantangan, UserTantangan }
    ) {
      const user_tantangan = await UserTantangan.findAll({
        where: {
          user_id: user_id,
        },
        order: [["createdAt", "DESC"]],
      });

      const tantangans = [];
      user_tantangan.forEach((element) => {
        tantangans.push(
          Tantangan.findByPk(element.tantangan_id, {
            include: {
              all: true,
              required: false,
            },
          })
        );
      });
      // console.log(tantangan_ids);
      return tantangans;
    },

    async user_lencanas (_, { user_id }, { User, Lencana }) {
      const user = await User.findByPk(user_id, {
        include: {
          model: Lencana,
          as: "lencanas",
          required: false,
          order: [["id", "ASC"]],
        },
      });

      // user.lencanas.forEach((element) => {
      //   console.log(element.id);
      // });
      return user.lencanas;
    },

    async tantangan(_, { id }, { Tantangan }) {
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
    },

    async user_tantangans(_, __, { UserTantangan }) {
      const user_tantangans = await UserTantangan.findAll();
      // console.log(user_tantangans);
      const all = [];
      user_tantangans.forEach((user_tantangan) => {
        // console.log(user_tantangan);
        const pushUser = async () => {
          return await User.findOne({
            where: {
              id: user_tantangan.user_id,
            },
          });
        };
        const pushTantangan = async () => {
          return await Tantangan.findOne({
            where: {
              id: user_tantangan.tantangan_id,
            },
          });
        };
        all.push({
          jawaban: user_tantangan.jawaban ? user_tantangan.jawaban : "",
          is_approved:
            user_tantangan.is_approved == null
              ? "undefined"
              : user_tantangan.is_approved,
          user: pushUser(),
          tantangan: pushTantangan(),
        });
      });

      return all;
    },

    async user_tantangan(_, { user_id, tantangan_id }, { UserTantangan }) {
      const user_tantangan = await UserTantangan.findOne({
        where: {
          user_id: user_id,
          tantangan_id: tantangan_id,
        },
      })
        .then((user_tantangan) => {
          // console.log(user_tantangan);
          return user_tantangan;
        })
        .catch((err) => {
          // console.log(err);
          throw new ApolloError(err);
        });

      const user = await User.findOne({
        where: {
          id: user_id,
        },
      })
        .then((user) => {
          // console.log(user);
          return user;
        })
        .catch((err) => {
          // console.log(err);
          throw new ApolloError(err);
        });

      const tantangan = await Tantangan.findOne({
        where: {
          id: tantangan_id,
        },
      })
        .then((tantangan) => {
          // console.log(tantangan);
          return tantangan;
        })
        .catch((err) => {
          console.log(err);
          throw new ApolloError(err);
        });

      return {
        is_approved:
          user_tantangan.is_approved == null
            ? "undefined"
            : user_tantangan.is_approved,
        jawaban: user_tantangan.jawaban == null ? "" : user_tantangan.jawaban,
        user: user,
        tantangan: tantangan,
      };
    },

    async ceritas(_, __, { Cerita }) {
      return await Cerita.findAll()
        .then((ceritas) => {
          // console.log(ceritas);
          return ceritas;
        })
        .catch((err) => {
          console.log(err);
          throw new ApolloError(err);
        });
    },

    async cerita(_, { id }, { Cerita }) {
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
    },

    async artikels(_, __, { Artikel }) {
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
    },

    async artikel(_, { id }, { Artikel }) {
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
    },

    async kategoris(_, __, { Kategori }) {
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
    },

    async kategori(_, { id }, { Kategori }) {
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
    },

    async laporans(_, __, { Laporan }) {
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
    },

    async laporan(_, { id }, { Laporan }) {
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
    },

    async langganans(_, __, { Langganan }) {
      return await Langganan.findAll({
        include: {
          all: true,
          required: false,
        },
      })
        .then((langganans) => {
          // console.log(langganans);
          return langganans;
        })
        .catch((err) => {
          console.log(err);
          throw new ApolloError(err);
        });
    },

    async langganan(_, { id }, { Langganan }) {
      return await Langganan.findOne({
        where: {
          id: id,
        },
        include: {
          all: true,
          required: false,
        },
      })
        .then((langganan) => {
          // console.log(langganan);
          return langganan;
        })
        .catch((err) => {
          console.log(err);
          throw new ApolloError(err);
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
      const c = await RiwayatBelajar.create({
        user_id,
        nomor_modul,
        nomor_pelajaran,
        // include : {
        //   model: User,
        //   as: "user",
        // }
      });
      console.log(await c.reload());
      return await c.reload({
        include: {
          model: User,
          as: "user",
        },
      });
    },

    async createUserLencana(_, { user_id, lencana_id }, { User }) {
      const user = await User.findByPk(user_id);
      const lencana = await Lencana.findByPk(lencana_id);
      user.addLencanas(lencana);
      return await User.findOne({
        where: { id: user_id },
        include: {
          all: true,
          required: false,
        },
      });
    },
    // async deleteUser(_, { id }, { User }) {
    //   await User.destroy({ where: { id } });
    //   return true;
    // },

    async createLencana(_, { nama, url_gambar }, { Lencana }) {
      return await Lencana.create({ nama, url_gambar });
    },

    async createUserTantangan(
      _,
      { user_id, tantangan_id, jawaban },
      { User, Tantangan, UserTantangan }
    ) {
      // const c = await
      // const c = await UserTantangan.create({ user_id, tantangan_id });
      // const check = await UserTantangan.findAll()
      const tantangan = await Tantangan.findByPk(tantangan_id);
      const user = await User.findByPk(user_id);
      await user.addTantangans(tantangan);
      if (tantangan.kunci_jawaban.toLowerCase() === jawaban.toLowerCase()) {
        await UserTantangan.update(
          { user_id, tantangan_id, jawaban, is_approved: true },
          { where: { user_id, tantangan_id } }
        );
      } else {
        await UserTantangan.update(
          { user_id, tantangan_id, jawaban, is_approved: false },
          { where: { user_id, tantangan_id } }
        );
      }
      const result = await UserTantangan.findOne({
        where: { user_id: user_id, tantangan_id: tantangan_id },
        order: [["createdAt", "DESC"]],
      });
      // console.log(result.tantangans);
      // console.log(result.createdAt);
      // console.log(result.updatedAt);

      // return await result;
      return {
        user: user,
        tantangan: tantangan,
        jawaban: result.jawaban == null ? "" : result.jawaban,
        is_approved: result.is_approved,
      };
    },

    /* async updateUserTantangan(
      _,
      { user_id, tantangan_id, jawaban },
      { UserTantangan, User, Tantangan }
    ) {
      const tantangan = await Tantangan.findByPk(tantangan_id);
      const user = await User.findByPk(user_id);
      // console.log(tantangan.kunci_jawaban.toLowerCase());
      if (tantangan.kunci_jawaban.toLowerCase() === jawaban.toLowerCase()) {
        await UserTantangan.update(
          { user_id, tantangan_id, jawaban, is_approved: true },
          { where: { user_id, tantangan_id } }
        );
      } else {
        await UserTantangan.update(
          { user_id, tantangan_id, jawaban, is_approved: false },
          { where: { user_id, tantangan_id } }
        );
      }
      return await {
        user: user,
        tantangan: tantangan,
        jawaban: jawaban,
        is_approved:
          tantangan.kunci_jawaban.toLowerCase() === jawaban.toLowerCase()
            ? true
            : false,
      };
    }, */

    async createTantangan(
      _,
      { nama, exp, soal, pertanyaan, kunci_jawaban, url_gambar },
      { Tantangan }
    ) {
      return await Tantangan.create({
        nama,
        exp,
        soal,
        pertanyaan,
        kunci_jawaban,
        url_gambar,
      });
    },

    async updateTantangan(
      _,
      { id, nama, exp, soal, pertanyaan, kunci_jawaban, url_gambar },
      { Tantangan }
    ) {
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
    },

    async createLevel(_, { nama }, { Level }) {
      const level = await Level.create({ nama });

      return level.reload({
        include: {
          all: true,
          required: false,
        },
      });
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
      { judul, kategori_id, isi, url_gambar },
      { Artikel }
    ) {
      const artikel = await Artikel.create({
        judul,
        kategori_id,
        isi,
        url_gambar,
      });

      return artikel.reload({
        include: {
          all: true,
          required: false,
        },
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
      return await Artikel.findOne({
        where: { id },
        include: {
          all: true,
          required: false,
        },
      });
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

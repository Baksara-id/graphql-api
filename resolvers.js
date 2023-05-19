const { Level } = require("./models");

const resolvers = {
  Query: {
    async users(_, __, { User }) {
      console.log(_);
      const s = User.findAll({
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
      // console.log(s);
      return await s;
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

    async lencanas(_, __, {Lencana}) {
      return await Lencana.findAll({
        include: {
          model:User, 
          as: 'users'
        }
      });
    },
    async lencana(_, {id}, {Lencana}) {
      return await Lencana.findAll({
        where: {
          id: id,
        },
        include: {
          model:User,
          as: 'users'
        }
      });
    },

    


    
    
  },
  Mutation: {
    async createUser(_, { name, email, password }, { User }) {
      return await User.create({ name, email, password });
    },
    async updateUser(_, { id, name, email, password, exp, level, jumlah_scan }, { User }) {
      await User.update({ name, email, password, exp, level, jumlah_scan  }, { where: { id } });
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

    async createUserLencana(_, {user_id, lencana_id}, {User}) {
      User.addLencanas(user_id, lencana_id); 
      return await User.findAll({
        where: {user_id},
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
      })
    },
    // async deleteUser(_, { id }, { User }) {
    //   await User.destroy({ where: { id } });
    //   return true;
    // },
    async createLevel(_, { nama }, { Level }) {
      return await Level.create({ nama });
    },
    async updateLevel(_, { id, nama }, { Level }) {
      await Level.update({ nama }, { where: { id } });
      return await Level.findByPk(id);
    },
    async deleteLevel(_, { id }, { Level }) {
      await Level.destroy({ where: { id } });
      return true;
    },
    async createUserLevel(_, { user_id, level_id }, { UserLevel }) {
      return await UserLevel.create({ user_id, level_id });
    },
    async updateUserLevel(_, { user_id, level_id }, { UserLevel }) {
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
  },
};

module.exports = resolvers;

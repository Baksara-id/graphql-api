const { Level } = require("./models");

const resolvers = {
  Query: {
    users(_, __, { User }) {
      console.log(_);
      const s = User.findAll(
        {
          // terus tak tambahi include iki pas query
          include: [
            {
              model: Level,
              as: "levels",
            }
          ],
        }
      );
      // console.log(s);
      return s
    },
    levels(_, __, { Level }) {
      return Level.findAll();
    },
    user_levels(_, __, { UserLevel }) {
      return UserLevel.findAll();
    },
  },
  Mutation: {
    async createUser(_, { name, email, password }, { User }) {
      return await User.create({ name, email, password });
    },
    async updateUser(_, { id, name, email, password }, { User }) {
      await User.update({ name, email, password }, { where: { id } });
      return await User.findByPk(id);
    },
    async deleteUser(_, { id }, { User }) {
      await User.destroy({ where: { id } });
      return true;
    },
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

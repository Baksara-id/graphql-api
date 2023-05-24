const user_tantangans = async (_, __, { UserTantangan, User, Tantangan }) => {
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
};

const user_tantangan = async (
  _,
  { user_id, tantangan_id },
  { UserTantangan, User, Tantangan }
) => {
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
};

const createUserTantangan = async (
  _,
  { user_id, tantangan_id, jawaban },
  { User, Tantangan, UserTantangan }
) => {
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
};

module.exports = {
    user_tantangans : user_tantangans,
    user_tantangan : user_tantangan,
    createUserTantangan : createUserTantangan,
};


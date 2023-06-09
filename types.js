const { ApolloServer, gql } = require('apollo-server');

const types = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    token: String
    avatar: String
    exp: Int
    level: Int
    jumlah_scan: Int
    kadaluwarsa: String
    levels: [Level]
    riwayat_belajars: [RiwayatBelajar]
    lencanas: [Lencana]
    laporans: [Laporan]
    langganan: Langganan
  }
  type Level {
    id: Int!
    nama: String!
    users: [User]
  }
  type UserLevel {
    user_id: Int!
    level_id: Int!
  }

  type RiwayatBelajar {
    id: Int!
    user: User
    nomor_modul: Int!
    nomor_pelajaran: Int!
  }
  type Lencana {
    id: Int!
    nama: String!
    url_gambar: String!
    users: [User]
  }
  type Laporan {
    id: Int!
    user: User
    judul: String!
    isi: String!
  }
  type Langganan {
    id: Int!
    users: [User]
    nama: String!
    harga: Float!
  }
  type Tantangan {
    id: Int!
    users: [User]
    nama: String!
    exp: Int!
    soal: String!
    pertanyaan: String!
    kunci_jawaban: String!
    url_gambar: String!
    is_approved: Boolean
  }

  type UserTantangan {
    user: User
    tantangan: Tantangan
    is_approved: Boolean!
    jawaban: String!
  }

  type Cerita {
    id: Int!
    judul: String!
    deskripsi: String!
    url_isi: String!
    url_gambar: String!
  }

  type Artikel {
    id: Int!
    kategori: Kategori
    judul: String!
    isi: String!
    url_gambar: String!
    createdAt: String
  }

  type Kategori {
    id: Int!
    nama: String!
    artikel: [Artikel]
  }

  type Langganan {
    id: Int!
    users: [User]
    nama: String!
    harga: Float!
    durasi: Int!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
    levels: [Level!]!
    # user_levels: [UserLevel!]!
    riwayat_belajars: [RiwayatBelajar!]!
    riwayat_belajar(user_id: Int!): RiwayatBelajar
    lencanas: [Lencana!]!
    lencana(id: Int!): Lencana
    user_lencanas(user_id: Int!): [Lencana!]!
    tantangans: [Tantangan!]!
    riwayat_tantangans(user_id: Int!): [Tantangan!]!
    getTantangans(user_id: Int!): [Tantangan!]!
    tantangan(id: Int!): Tantangan
    user_tantangans: [UserTantangan!]!
    user_tantangan(user_id: Int!, tantangan_id: Int!): UserTantangan
    ceritas: [Cerita!]!
    cerita(id: Int!): Cerita
    artikels: [Artikel!]!
    artikel(id: Int!): Artikel
    kategoris: [Kategori!]!
    kategori(id: Int!): Kategori
    laporans: [Laporan!]!
    laporan(id: Int!): Laporan
    langganans: [Langganan!]!
    langganan(id: Int!): Langganan
    level(id: Int!): Level
  }
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!

    loginUser(email: String!, password: String!): User!

    logoutUser(id: Int!): Boolean!

    updateUser(
      id: Int!
      name: String
      email: String
      password: String
      exp: Int
      level: Int
      jumlah_scan: Int
    ): User!

    createRiwayatBelajar(
      user_id: Int!
      nomor_modul: Int!
      nomor_pelajaran: Int!
    ): RiwayatBelajar!

    createUserLencana(user_id: Int!, lencana_id: Int!): User!

    createLencana(nama: String!, url_gambar: String!): Lencana!

    createUserTantangan(
      user_id: Int!
      tantangan_id: Int!
      jawaban: String!
    ): UserTantangan!

    createTantangan(
      nama: String!
      exp: Int!
      soal: String!
      pertanyaan: String!
      kunci_jawaban: String!
      url_gambar: String!
    ): Tantangan!

    updateTantangan(
      id: Int!
      nama: String!
      exp: Int!
      soal: String!
      pertanyaan: String!
      kunci_jawaban: String!
      url_gambar: String!
    ): Tantangan!

    createLevel(nama: String!): Level!

    createUserLevel(user_id: Int!, level_id: Int!): UserLevel!
    createCerita(
      judul: String!
      deskripsi: String!
      url_isi: String!
      url_gambar: String!
    ): Cerita!

    createArtikel(
      kategori_id: Int!
      judul: String!
      isi: String!
      url_gambar: String!
    ): Artikel!

    updateArtikel(
      id: Int!
      kategori_id: Int!
      judul: String!
      isi: String!
      url_gambar: String!
    ): Artikel!

    createLaporan(user_id: Int!, judul: String!, isi: String!): Laporan!

    updateLaporan(
      id: Int!
      user_id: Int!
      judul: String!
      isi: String!
    ): Laporan!

    updateLevel(id: Int!, nama: String!): Level!
  }
`;

module.exports = types;

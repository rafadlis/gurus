import {
  pgTable,
  text,
  bigint,
  timestamp,
  foreignKey,
  integer,
  smallint,
  index,
  unique,
  check,
  serial,
  varchar,
  primaryKey,
  pgSequence,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const status_absen = pgEnum("status_absen", [
  "hadir",
  "ijin",
  "sakit",
  "alpha",
  "tugas",
  "lainnya",
]);

export const NilaiKeaktifan_id_seq = pgSequence("NilaiKeaktifan_id_seq", {
  startWith: "1",
  increment: "1",
  minValue: "1",
  maxValue: "9223372036854775807",
  cache: "1",
  cycle: false,
});

export const Provinsi = pgTable("Provinsi", {
  kode_provinsi: text().primaryKey().notNull(),
  nama_provinsi: text().notNull(),
});

export const MataPelajaran = pgTable("MataPelajaran", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: "MataPelajaran_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
    }),
  created_at: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
  mata_pelajaran: text(),
  tingkat_kelas: text(),
});

export const AbsenMurid = pgTable(
  "AbsenMurid",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "AbsenMurid_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
      }),
    created_at: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    jadwal_id: bigint({ mode: "number" }).notNull(),
    murid_id: integer().notNull(),
    status_absen: status_absen(),
  },
  (table) => [
    foreignKey({
      columns: [table.jadwal_id],
      foreignColumns: [Jadwal.id],
      name: "AbsenMurid_jadwal_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.murid_id],
      foreignColumns: [Murid.id],
      name: "AbsenMurid_murid_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const Sekolah = pgTable(
  "Sekolah",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "Sekolah_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
      }),
    created_at: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
    nama_sekolah: text(),
    kode_provinsi: text(),
    kode_kabupaten: text(),
    nama_resmi: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.kode_provinsi, table.kode_kabupaten],
      foreignColumns: [Kabupaten.kode_kabupaten, Kabupaten.kode_provinsi],
      name: "Sekolah_kode_kabupaten_kode_provinsi_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    foreignKey({
      columns: [table.kode_provinsi],
      foreignColumns: [Provinsi.kode_provinsi],
      name: "Sekolah_kode_provinsi_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ],
);

export const NilaiTugas = pgTable(
  "NilaiTugas",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "NilaiTugas_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
      }),
    created_at: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
    murid_id: integer(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    tugas_id: bigint({ mode: "number" }),
    nilai: smallint(),
  },
  (table) => [
    foreignKey({
      columns: [table.murid_id],
      foreignColumns: [Murid.id],
      name: "NilaiTugas_murid_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.tugas_id],
      foreignColumns: [Tugas.id],
      name: "NilaiTugas_tugas_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const NilaiKeaktifan = pgTable(
  "NilaiKeaktifan",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "nilai_keaktifan_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    created_at: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    jadwal_id: bigint({ mode: "number" }).notNull(),
    murid_id: integer().notNull(),
    nilai: integer().notNull(),
    catatan: text(),
  },
  (table) => [
    index("nilai_keaktifan_jadwal_id_idx").using(
      "btree",
      table.jadwal_id.asc().nullsLast().op("int8_ops"),
    ),
    index("nilai_keaktifan_murid_id_idx").using(
      "btree",
      table.murid_id.asc().nullsLast().op("int4_ops"),
    ),
    foreignKey({
      columns: [table.jadwal_id],
      foreignColumns: [Jadwal.id],
      name: "NilaiKeaktifan_jadwal_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.murid_id],
      foreignColumns: [Murid.id],
      name: "NilaiKeaktifan_murid_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    unique("NilaiKeaktifan_id_key").on(table.id),
    check("nilai_range_check", sql`(nilai >= 0) AND (nilai <= 100)`),
  ],
);

export const PenempatanGuru = pgTable(
  "PenempatanGuru",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "PenempatanGuru_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
      }),
    created_at: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    guru_id: bigint({ mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    sekolah_id: bigint({ mode: "number" }).notNull(),
    tanggal_mulai: timestamp({ withTimezone: true, mode: "string" }).notNull(),
    tanggal_selesai: timestamp({ withTimezone: true, mode: "string" }),
  },
  (table) => [
    foreignKey({
      columns: [table.guru_id],
      foreignColumns: [Guru.id],
      name: "PenempatanGuru_guru_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.sekolah_id],
      foreignColumns: [Sekolah.id],
      name: "PenempatanGuru_sekolah_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ],
);

export const Tugas = pgTable(
  "Tugas",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "Tugas_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
      }),
    created_at: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
    tanggal_tugas: timestamp({ withTimezone: true, mode: "string" }),
    jatuh_tempo: timestamp({ withTimezone: true, mode: "string" }),
    nama_tugas: text(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    mapel_id: bigint({ mode: "number" }),
  },
  (table) => [
    foreignKey({
      columns: [table.mapel_id],
      foreignColumns: [MataPelajaran.id],
      name: "Tugas_mapel_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const Guru = pgTable("Guru", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: "Guru_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
    }),
  created_at: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
  nama_guru: text().notNull(),
  nama_panggilan: text(),
});

export const NilaiUAS = pgTable(
  "NilaiUAS",
  {
    id: serial().primaryKey().notNull(),
    benar: integer().notNull(),
    nama_lain_id: integer(),
  },
  (table) => [
    foreignKey({
      columns: [table.nama_lain_id],
      foreignColumns: [NamaLain.id],
      name: "nilai_nama_lain_id_nama_lain_id_fk",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const NamaLain = pgTable(
  "NamaLain",
  {
    id: serial().primaryKey().notNull(),
    nama_lain: varchar({ length: 255 }).notNull(),
    kelas: varchar({ length: 255 }).notNull(),
    murid_id: integer(),
  },
  (table) => [
    foreignKey({
      columns: [table.murid_id],
      foreignColumns: [Murid.id],
      name: "NamaLain_murid_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ],
);

export const Murid = pgTable(
  "Murid",
  {
    id: serial().primaryKey().notNull(),
    nama: varchar({ length: 255 }).notNull(),
    kelas: varchar({ length: 255 }).notNull(),
    nomor_absen: varchar({ length: 255 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    kelas_id: bigint({ mode: "number" }).notNull(),
    NISN: text(),
    NIS: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.kelas_id],
      foreignColumns: [Kelas.id],
      name: "Murid_kelas_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    unique("Murid_NISN_key").on(table.NISN),
    check("Murid_NISN_check", sql`length("NISN") = 10`),
  ],
);

export const Kelas = pgTable(
  "Kelas",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "Kelas_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
      }),
    created_at: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
    nama_kelas: text(),
    tingkat: text(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    sekolah_id: bigint({ mode: "number" }),
  },
  (table) => [
    foreignKey({
      columns: [table.sekolah_id],
      foreignColumns: [Sekolah.id],
      name: "Kelas_sekolah_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ],
);

export const Jadwal = pgTable(
  "Jadwal",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "JadwalGuru_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
      }),
    created_at: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    kelas_id: bigint({ mode: "number" }).notNull(),
    waktu_mulai: timestamp({ withTimezone: true, mode: "string" }).notNull(),
    waktu_selesai: timestamp({ withTimezone: true, mode: "string" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    mapel_id: bigint({ mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    penempatan_guru_id: bigint({ mode: "number" }),
  },
  (table) => [
    foreignKey({
      columns: [table.kelas_id],
      foreignColumns: [Kelas.id],
      name: "JadwalGuru_kelas_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    foreignKey({
      columns: [table.mapel_id],
      foreignColumns: [MataPelajaran.id],
      name: "Jadwal_mapel_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    foreignKey({
      columns: [table.penempatan_guru_id],
      foreignColumns: [PenempatanGuru.id],
      name: "Jadwal_penempatan_guru_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ],
);

export const Kabupaten = pgTable(
  "Kabupaten",
  {
    kode_kabupaten: text().notNull(),
    kode_provinsi: text().notNull(),
    nama_kabupaten: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.kode_provinsi],
      foreignColumns: [Provinsi.kode_provinsi],
      name: "Kabupaten_kode_provinsi_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    primaryKey({ columns: [table.kode_kabupaten, table.kode_provinsi], name: "Kabupaten_pkey" }),
  ],
);

export const Kecamatan = pgTable(
  "Kecamatan",
  {
    kode_provinsi: text().notNull(),
    kode_kabupaten: text().notNull(),
    nama_kecamatan: text().notNull(),
    kode_kecamatan: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.kode_provinsi, table.kode_kabupaten],
      foreignColumns: [Kabupaten.kode_kabupaten, Kabupaten.kode_provinsi],
      name: "Kecamatan_kode_kabupaten_kode_provinsi_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    foreignKey({
      columns: [table.kode_provinsi],
      foreignColumns: [Provinsi.kode_provinsi],
      name: "Kecamatan_kode_provinsi_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    primaryKey({
      columns: [table.kode_provinsi, table.kode_kabupaten, table.kode_kecamatan],
      name: "Kecamatan_pkey",
    }),
  ],
);

export const DesaKelurahan = pgTable(
  "DesaKelurahan",
  {
    kode_provinsi: text().notNull(),
    kode_kabupaten: text().notNull(),
    kode_kecamatan: text().notNull(),
    kode_desa_kelurahan: text().notNull(),
    nama_desa_kelurahan: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.kode_provinsi, table.kode_kabupaten],
      foreignColumns: [Kabupaten.kode_kabupaten, Kabupaten.kode_provinsi],
      name: "DesaKelurahan_kode_kabupaten_kode_provinsi_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    foreignKey({
      columns: [table.kode_provinsi, table.kode_kabupaten, table.kode_kecamatan],
      foreignColumns: [Kecamatan.kode_provinsi, Kecamatan.kode_kabupaten, Kecamatan.kode_kecamatan],
      name: "DesaKelurahan_kode_kecamatan_kode_kabupaten_kode_provinsi_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    foreignKey({
      columns: [table.kode_provinsi],
      foreignColumns: [Provinsi.kode_provinsi],
      name: "DesaKelurahan_kode_provinsi_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    primaryKey({
      columns: [
        table.kode_provinsi,
        table.kode_kabupaten,
        table.kode_kecamatan,
        table.kode_desa_kelurahan,
      ],
      name: "DesaKelurahan_pkey",
    }),
  ],
);

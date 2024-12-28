import { relations } from "drizzle-orm/relations";
import { Jadwal, AbsenMurid, Murid, Kabupaten, Sekolah, Provinsi, NilaiTugas, Tugas, NilaiKeaktifan, Guru, PenempatanGuru, MataPelajaran, NamaLain, NilaiUAS, Kelas, Kecamatan, DesaKelurahan } from "./schema";

export const AbsenMuridRelations = relations(AbsenMurid, ({one}) => ({
	Jadwal: one(Jadwal, {
		fields: [AbsenMurid.jadwal_id],
		references: [Jadwal.id]
	}),
	Murid: one(Murid, {
		fields: [AbsenMurid.murid_id],
		references: [Murid.id]
	}),
}));

export const JadwalRelations = relations(Jadwal, ({one, many}) => ({
	AbsenMurids: many(AbsenMurid),
	NilaiKeaktifans: many(NilaiKeaktifan),
	Kela: one(Kelas, {
		fields: [Jadwal.kelas_id],
		references: [Kelas.id]
	}),
	MataPelajaran: one(MataPelajaran, {
		fields: [Jadwal.mapel_id],
		references: [MataPelajaran.id]
	}),
	PenempatanGuru: one(PenempatanGuru, {
		fields: [Jadwal.penempatan_guru_id],
		references: [PenempatanGuru.id]
	}),
}));

export const MuridRelations = relations(Murid, ({one, many}) => ({
	AbsenMurids: many(AbsenMurid),
	NilaiTugases: many(NilaiTugas),
	NilaiKeaktifans: many(NilaiKeaktifan),
	NamaLains: many(NamaLain),
	Kela: one(Kelas, {
		fields: [Murid.kelas_id],
		references: [Kelas.id]
	}),
}));

export const SekolahRelations = relations(Sekolah, ({one, many}) => ({
	Kabupaten: one(Kabupaten, {
		fields: [Sekolah.kode_provinsi],
		references: [Kabupaten.kode_kabupaten]
	}),
	Provinsi: one(Provinsi, {
		fields: [Sekolah.kode_provinsi],
		references: [Provinsi.kode_provinsi]
	}),
	PenempatanGurus: many(PenempatanGuru),
	Kelas: many(Kelas),
}));

export const KabupatenRelations = relations(Kabupaten, ({one, many}) => ({
	Sekolahs: many(Sekolah),
	Provinsi: one(Provinsi, {
		fields: [Kabupaten.kode_provinsi],
		references: [Provinsi.kode_provinsi]
	}),
	Kecamatans: many(Kecamatan),
	DesaKelurahans: many(DesaKelurahan),
}));

export const ProvinsiRelations = relations(Provinsi, ({many}) => ({
	Sekolahs: many(Sekolah),
	Kabupatens: many(Kabupaten),
	Kecamatans: many(Kecamatan),
	DesaKelurahans: many(DesaKelurahan),
}));

export const NilaiTugasRelations = relations(NilaiTugas, ({one}) => ({
	Murid: one(Murid, {
		fields: [NilaiTugas.murid_id],
		references: [Murid.id]
	}),
	Tugas: one(Tugas, {
		fields: [NilaiTugas.tugas_id],
		references: [Tugas.id]
	}),
}));

export const TugasRelations = relations(Tugas, ({one, many}) => ({
	NilaiTugases: many(NilaiTugas),
	MataPelajaran: one(MataPelajaran, {
		fields: [Tugas.mapel_id],
		references: [MataPelajaran.id]
	}),
}));

export const NilaiKeaktifanRelations = relations(NilaiKeaktifan, ({one}) => ({
	Jadwal: one(Jadwal, {
		fields: [NilaiKeaktifan.jadwal_id],
		references: [Jadwal.id]
	}),
	Murid: one(Murid, {
		fields: [NilaiKeaktifan.murid_id],
		references: [Murid.id]
	}),
}));

export const PenempatanGuruRelations = relations(PenempatanGuru, ({one, many}) => ({
	Guru: one(Guru, {
		fields: [PenempatanGuru.guru_id],
		references: [Guru.id]
	}),
	Sekolah: one(Sekolah, {
		fields: [PenempatanGuru.sekolah_id],
		references: [Sekolah.id]
	}),
	Jadwals: many(Jadwal),
}));

export const GuruRelations = relations(Guru, ({many}) => ({
	PenempatanGurus: many(PenempatanGuru),
}));

export const MataPelajaranRelations = relations(MataPelajaran, ({many}) => ({
	Tugases: many(Tugas),
	Jadwals: many(Jadwal),
}));

export const NilaiUASRelations = relations(NilaiUAS, ({one}) => ({
	NamaLain: one(NamaLain, {
		fields: [NilaiUAS.nama_lain_id],
		references: [NamaLain.id]
	}),
}));

export const NamaLainRelations = relations(NamaLain, ({one, many}) => ({
	NilaiUAS: many(NilaiUAS),
	Murid: one(Murid, {
		fields: [NamaLain.murid_id],
		references: [Murid.id]
	}),
}));

export const KelasRelations = relations(Kelas, ({one, many}) => ({
	Murids: many(Murid),
	Sekolah: one(Sekolah, {
		fields: [Kelas.sekolah_id],
		references: [Sekolah.id]
	}),
	Jadwals: many(Jadwal),
}));

export const KecamatanRelations = relations(Kecamatan, ({one, many}) => ({
	Kabupaten: one(Kabupaten, {
		fields: [Kecamatan.kode_provinsi],
		references: [Kabupaten.kode_kabupaten]
	}),
	Provinsi: one(Provinsi, {
		fields: [Kecamatan.kode_provinsi],
		references: [Provinsi.kode_provinsi]
	}),
	DesaKelurahans: many(DesaKelurahan),
}));

export const DesaKelurahanRelations = relations(DesaKelurahan, ({one}) => ({
	Kabupaten: one(Kabupaten, {
		fields: [DesaKelurahan.kode_provinsi],
		references: [Kabupaten.kode_kabupaten]
	}),
	Kecamatan: one(Kecamatan, {
		fields: [DesaKelurahan.kode_provinsi],
		references: [Kecamatan.kode_provinsi]
	}),
	Provinsi: one(Provinsi, {
		fields: [DesaKelurahan.kode_provinsi],
		references: [Provinsi.kode_provinsi]
	}),
}));
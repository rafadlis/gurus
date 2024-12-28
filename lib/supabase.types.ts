export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      AbsenMurid: {
        Row: {
          created_at: string
          id: number
          jadwal_id: number
          murid_id: number
          status_absen: Database["public"]["Enums"]["status_absen"] | null
        }
        Insert: {
          created_at?: string
          id?: number
          jadwal_id: number
          murid_id: number
          status_absen?: Database["public"]["Enums"]["status_absen"] | null
        }
        Update: {
          created_at?: string
          id?: number
          jadwal_id?: number
          murid_id?: number
          status_absen?: Database["public"]["Enums"]["status_absen"] | null
        }
        Relationships: [
          {
            foreignKeyName: "AbsenMurid_jadwal_id_fkey"
            columns: ["jadwal_id"]
            isOneToOne: false
            referencedRelation: "Jadwal"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "AbsenMurid_murid_id_fkey"
            columns: ["murid_id"]
            isOneToOne: false
            referencedRelation: "Murid"
            referencedColumns: ["id"]
          },
        ]
      }
      DesaKelurahan: {
        Row: {
          kode_desa_kelurahan: string
          kode_kabupaten: string
          kode_kecamatan: string
          kode_provinsi: string
          nama_desa_kelurahan: string
        }
        Insert: {
          kode_desa_kelurahan: string
          kode_kabupaten: string
          kode_kecamatan: string
          kode_provinsi: string
          nama_desa_kelurahan: string
        }
        Update: {
          kode_desa_kelurahan?: string
          kode_kabupaten?: string
          kode_kecamatan?: string
          kode_provinsi?: string
          nama_desa_kelurahan?: string
        }
        Relationships: [
          {
            foreignKeyName: "DesaKelurahan_kode_kabupaten_kode_provinsi_fkey"
            columns: ["kode_kabupaten", "kode_provinsi"]
            isOneToOne: false
            referencedRelation: "Kabupaten"
            referencedColumns: ["kode_kabupaten", "kode_provinsi"]
          },
          {
            foreignKeyName: "DesaKelurahan_kode_kecamatan_kode_kabupaten_kode_provinsi_fkey"
            columns: ["kode_kecamatan", "kode_kabupaten", "kode_provinsi"]
            isOneToOne: false
            referencedRelation: "Kecamatan"
            referencedColumns: [
              "kode_kecamatan",
              "kode_kabupaten",
              "kode_provinsi",
            ]
          },
          {
            foreignKeyName: "DesaKelurahan_kode_provinsi_fkey"
            columns: ["kode_provinsi"]
            isOneToOne: false
            referencedRelation: "Provinsi"
            referencedColumns: ["kode_provinsi"]
          },
        ]
      }
      Guru: {
        Row: {
          created_at: string
          id: number
          nama_guru: string
          nama_panggilan: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          nama_guru: string
          nama_panggilan?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          nama_guru?: string
          nama_panggilan?: string | null
        }
        Relationships: []
      }
      Jadwal: {
        Row: {
          created_at: string
          id: number
          kelas_id: number
          mapel_id: number
          penempatan_guru_id: number | null
          waktu_mulai: string
          waktu_selesai: string
        }
        Insert: {
          created_at?: string
          id?: number
          kelas_id: number
          mapel_id: number
          penempatan_guru_id?: number | null
          waktu_mulai: string
          waktu_selesai: string
        }
        Update: {
          created_at?: string
          id?: number
          kelas_id?: number
          mapel_id?: number
          penempatan_guru_id?: number | null
          waktu_mulai?: string
          waktu_selesai?: string
        }
        Relationships: [
          {
            foreignKeyName: "Jadwal_mapel_id_fkey"
            columns: ["mapel_id"]
            isOneToOne: false
            referencedRelation: "MataPelajaran"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Jadwal_penempatan_guru_id_fkey"
            columns: ["penempatan_guru_id"]
            isOneToOne: false
            referencedRelation: "PenempatanGuru"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "JadwalGuru_kelas_id_fkey"
            columns: ["kelas_id"]
            isOneToOne: false
            referencedRelation: "Kelas"
            referencedColumns: ["id"]
          },
        ]
      }
      Kabupaten: {
        Row: {
          kode_kabupaten: string
          kode_provinsi: string
          nama_kabupaten: string
        }
        Insert: {
          kode_kabupaten: string
          kode_provinsi: string
          nama_kabupaten: string
        }
        Update: {
          kode_kabupaten?: string
          kode_provinsi?: string
          nama_kabupaten?: string
        }
        Relationships: [
          {
            foreignKeyName: "Kabupaten_kode_provinsi_fkey"
            columns: ["kode_provinsi"]
            isOneToOne: false
            referencedRelation: "Provinsi"
            referencedColumns: ["kode_provinsi"]
          },
        ]
      }
      Kecamatan: {
        Row: {
          kode_kabupaten: string
          kode_kecamatan: string
          kode_provinsi: string
          nama_kecamatan: string
        }
        Insert: {
          kode_kabupaten: string
          kode_kecamatan: string
          kode_provinsi: string
          nama_kecamatan: string
        }
        Update: {
          kode_kabupaten?: string
          kode_kecamatan?: string
          kode_provinsi?: string
          nama_kecamatan?: string
        }
        Relationships: [
          {
            foreignKeyName: "Kecamatan_kode_kabupaten_kode_provinsi_fkey"
            columns: ["kode_kabupaten", "kode_provinsi"]
            isOneToOne: false
            referencedRelation: "Kabupaten"
            referencedColumns: ["kode_kabupaten", "kode_provinsi"]
          },
          {
            foreignKeyName: "Kecamatan_kode_provinsi_fkey"
            columns: ["kode_provinsi"]
            isOneToOne: false
            referencedRelation: "Provinsi"
            referencedColumns: ["kode_provinsi"]
          },
        ]
      }
      Kelas: {
        Row: {
          created_at: string
          id: number
          nama_kelas: string | null
          sekolah_id: number | null
          tingkat: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          nama_kelas?: string | null
          sekolah_id?: number | null
          tingkat?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          nama_kelas?: string | null
          sekolah_id?: number | null
          tingkat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Kelas_sekolah_id_fkey"
            columns: ["sekolah_id"]
            isOneToOne: false
            referencedRelation: "Sekolah"
            referencedColumns: ["id"]
          },
        ]
      }
      MataPelajaran: {
        Row: {
          created_at: string
          id: number
          mata_pelajaran: string | null
          tingkat_kelas: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          mata_pelajaran?: string | null
          tingkat_kelas?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          mata_pelajaran?: string | null
          tingkat_kelas?: string | null
        }
        Relationships: []
      }
      Murid: {
        Row: {
          id: number
          kelas: string
          kelas_id: number
          nama: string
          NIS: string | null
          NISN: string | null
          nomor_absen: string
        }
        Insert: {
          id?: number
          kelas: string
          kelas_id: number
          nama: string
          NIS?: string | null
          NISN?: string | null
          nomor_absen: string
        }
        Update: {
          id?: number
          kelas?: string
          kelas_id?: number
          nama?: string
          NIS?: string | null
          NISN?: string | null
          nomor_absen?: string
        }
        Relationships: [
          {
            foreignKeyName: "Murid_kelas_id_fkey"
            columns: ["kelas_id"]
            isOneToOne: false
            referencedRelation: "Kelas"
            referencedColumns: ["id"]
          },
        ]
      }
      NamaLain: {
        Row: {
          id: number
          kelas: string
          murid_id: number | null
          nama_lain: string
        }
        Insert: {
          id?: number
          kelas: string
          murid_id?: number | null
          nama_lain: string
        }
        Update: {
          id?: number
          kelas?: string
          murid_id?: number | null
          nama_lain?: string
        }
        Relationships: [
          {
            foreignKeyName: "NamaLain_murid_id_fkey"
            columns: ["murid_id"]
            isOneToOne: false
            referencedRelation: "Murid"
            referencedColumns: ["id"]
          },
        ]
      }
      NilaiKeaktifan: {
        Row: {
          catatan: string | null
          created_at: string
          id: number
          jadwal_id: number
          murid_id: number
          nilai: number
        }
        Insert: {
          catatan?: string | null
          created_at?: string
          id?: number
          jadwal_id: number
          murid_id: number
          nilai: number
        }
        Update: {
          catatan?: string | null
          created_at?: string
          id?: number
          jadwal_id?: number
          murid_id?: number
          nilai?: number
        }
        Relationships: [
          {
            foreignKeyName: "NilaiKeaktifan_jadwal_id_fkey"
            columns: ["jadwal_id"]
            isOneToOne: false
            referencedRelation: "Jadwal"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "NilaiKeaktifan_murid_id_fkey"
            columns: ["murid_id"]
            isOneToOne: false
            referencedRelation: "Murid"
            referencedColumns: ["id"]
          },
        ]
      }
      NilaiTugas: {
        Row: {
          created_at: string
          id: number
          murid_id: number | null
          nilai: number | null
          tugas_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          murid_id?: number | null
          nilai?: number | null
          tugas_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          murid_id?: number | null
          nilai?: number | null
          tugas_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "NilaiTugas_murid_id_fkey"
            columns: ["murid_id"]
            isOneToOne: false
            referencedRelation: "Murid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "NilaiTugas_tugas_id_fkey"
            columns: ["tugas_id"]
            isOneToOne: false
            referencedRelation: "Tugas"
            referencedColumns: ["id"]
          },
        ]
      }
      NilaiUAS: {
        Row: {
          benar: number
          id: number
          nama_lain_id: number | null
        }
        Insert: {
          benar: number
          id?: number
          nama_lain_id?: number | null
        }
        Update: {
          benar?: number
          id?: number
          nama_lain_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nilai_nama_lain_id_nama_lain_id_fk"
            columns: ["nama_lain_id"]
            isOneToOne: false
            referencedRelation: "NamaLain"
            referencedColumns: ["id"]
          },
        ]
      }
      PenempatanGuru: {
        Row: {
          created_at: string
          guru_id: number
          id: number
          sekolah_id: number
          tanggal_mulai: string
          tanggal_selesai: string | null
        }
        Insert: {
          created_at?: string
          guru_id: number
          id?: number
          sekolah_id: number
          tanggal_mulai: string
          tanggal_selesai?: string | null
        }
        Update: {
          created_at?: string
          guru_id?: number
          id?: number
          sekolah_id?: number
          tanggal_mulai?: string
          tanggal_selesai?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "PenempatanGuru_guru_id_fkey"
            columns: ["guru_id"]
            isOneToOne: false
            referencedRelation: "Guru"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "PenempatanGuru_sekolah_id_fkey"
            columns: ["sekolah_id"]
            isOneToOne: false
            referencedRelation: "Sekolah"
            referencedColumns: ["id"]
          },
        ]
      }
      Provinsi: {
        Row: {
          kode_provinsi: string
          nama_provinsi: string
        }
        Insert: {
          kode_provinsi: string
          nama_provinsi: string
        }
        Update: {
          kode_provinsi?: string
          nama_provinsi?: string
        }
        Relationships: []
      }
      Sekolah: {
        Row: {
          created_at: string
          id: number
          kode_kabupaten: string | null
          kode_provinsi: string | null
          nama_resmi: string | null
          nama_sekolah: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          kode_kabupaten?: string | null
          kode_provinsi?: string | null
          nama_resmi?: string | null
          nama_sekolah?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          kode_kabupaten?: string | null
          kode_provinsi?: string | null
          nama_resmi?: string | null
          nama_sekolah?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Sekolah_kode_kabupaten_kode_provinsi_fkey"
            columns: ["kode_kabupaten", "kode_provinsi"]
            isOneToOne: false
            referencedRelation: "Kabupaten"
            referencedColumns: ["kode_kabupaten", "kode_provinsi"]
          },
          {
            foreignKeyName: "Sekolah_kode_provinsi_fkey"
            columns: ["kode_provinsi"]
            isOneToOne: false
            referencedRelation: "Provinsi"
            referencedColumns: ["kode_provinsi"]
          },
        ]
      }
      Tugas: {
        Row: {
          created_at: string
          id: number
          jatuh_tempo: string | null
          mapel_id: number | null
          nama_tugas: string | null
          tanggal_tugas: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          jatuh_tempo?: string | null
          mapel_id?: number | null
          nama_tugas?: string | null
          tanggal_tugas?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          jatuh_tempo?: string | null
          mapel_id?: number | null
          nama_tugas?: string | null
          tanggal_tugas?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Tugas_mapel_id_fkey"
            columns: ["mapel_id"]
            isOneToOne: false
            referencedRelation: "MataPelajaran"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      status_absen: "hadir" | "ijin" | "sakit" | "alpha" | "tugas" | "lainnya"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

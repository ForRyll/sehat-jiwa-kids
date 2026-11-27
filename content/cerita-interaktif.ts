import { MascotMood } from "@/components/Mascot";

export type StoryOption = {
  text: string;
  emoji: string;
  nextNodeId: string;
};

export type StoryEnding = {
  title: string;
  outcome: string;
  mascotMood: MascotMood;
  copingInsight: string;
  copingTips: string[];
  materiSlug?: string;
  materiTitle?: string;
};

export type StoryNode = {
  id: string;
  narrative: string;
  mascotMood: MascotMood;
  options?: StoryOption[];
  ending?: StoryEnding;
};

export type InteractiveScenario = {
  id: string;
  title: string;
  emoji: string;
  category: string;
  description: string;
  initialNodeId: string;
  nodes: Record<string, StoryNode>;
};

export const CERITA_SCENARIOS: InteractiveScenario[] = [
  {
    id: "tugas-kelompok",
    title: "Dilema Tugas Kelompok Menjelang Deadline",
    emoji: "👥",
    category: "Relasi & Komunikasi",
    description:
      "Dua hari sebelum presentasi besar, satu anggota kelompokmu belum mengumpulkan bagiannya dan sulit dihubungi. Apa langkahmu?",
    initialNodeId: "start",
    nodes: {
      start: {
        id: "start",
        narrative:
          "Jam menunjukkan pukul 8 malam, tepat 48 jam sebelum presentasi di hadapan dosen penguji. Kamu mengecek Google Docs, dan halaman milik teman satu kelompokmu masih kosong melompati bab penting. Pesan grup terakhir hanya centang dua tanpa balasan.",
        mascotMood: "berpikir",
        options: [
          {
            emoji: "💬",
            text: "Kirim pesan personal (PC) dengan nada peduli dan tanyakan apakah ada kendala.",
            nextNodeId: "chat_personal",
          },
          {
            emoji: "😤",
            text: "Kesal banget! Langsung kerjakan semua bagiannya sendirian biar cepat selesai.",
            nextNodeId: "kerjakan_sendiri",
          },
          {
            emoji: "📢",
            text: "Kirim pesan tegas di grup meminta konfirmasi malam ini juga.",
            nextNodeId: "grup_tegas",
          },
        ],
      },

      chat_personal: {
        id: "chat_personal",
        narrative:
          "Kamu memutuskan menghubunginya lewat chat pribadi: 'Hai, aku lihat bab 3 belum terisi. Ada kendala kah? Biar kita cari solusinya bareng.' Beberapa menit kemudian ia membalas: ternyata ia sedang merawat orang tuanya yang mendadak sakit dan merasa sungkan bercerita.",
        mascotMood: "tenang",
        options: [
          {
            emoji: "🤝",
            text: "Bagi sisa tugasnya ke anggota lain yang bersedia membantu secara adil.",
            nextNodeId: "ending_asertif_empatik",
          },
          {
            emoji: "⏰",
            text: "Minta ia menyelesaikan kerangka poin-poin utamanya saja, tim yang rapikan.",
            nextNodeId: "ending_kerangka_solutif",
          },
        ],
      },

      kerjakan_sendiri: {
        id: "kerjakan_sendiri",
        narrative:
          "Kamu meminum kopi kedua dan begadang hingga jam 3 pagi menyelesaikan seluruh analisisnya. Slide selesai, tapi keesokan harinya kamu kelelahan luar biasa, sakit kepala, dan menyimpan dendam terpendam pada temanmu itu.",
        mascotMood: "tidur",
        options: [
          {
            emoji: "😮‍💨",
            text: "Lihat refleksi dari pilihan mengambil semua beban ini.",
            nextNodeId: "ending_burnout_martir",
          },
        ],
      },

      grup_tegas: {
        id: "grup_tegas",
        narrative:
          "Pesan tegasmu di grup membuat suasana mendadak dingin. Anggota lain ikut merasa canggung, namun akhirnya teman yang dicari merespons dengan nada tertekan bahwa laptopnya rusak dan ia bingung harus bagaimana.",
        mascotMood: "berpikir",
        options: [
          {
            emoji: "🕊️",
            text: "Turunkan tensi, tawarkan pakai laptop kampus atau berbagi file bersama.",
            nextNodeId: "ending_asertif_empatik",
          },
          {
            emoji: "📋",
            text: "Tetap buat kesepakatan batas waktu baru yang jelas malam ini.",
            nextNodeId: "ending_kerangka_solutif",
          },
        ],
      },

      ending_asertif_empatik: {
        id: "ending_asertif_empatik",
        narrative:
          "Tugas berhasil diselesaikan bersama dengan pembagian yang rasional. Presentasi berjalan lancar, dan hubungan antar anggota tim tetap terjaga dengan saling menghargai.",
        mascotMood: "senang",
        ending: {
          title: "Komunikasi Asertif & Penuh Empati",
          outcome:
            "Kamu memilih untuk mencari tahu akar masalah daripada langsung menghakimi. Ini menjaga kesehatan mentalmu sekaligus menyelesaikan masalah secara matang.",
          mascotMood: "senang",
          copingInsight:
            "Menurut penelitian psikologi komunikasi, gaya asertif yang ramah menurunkan hormon stres kortisol dan mencegah konflik destruktif dalam dinamika kelompok.",
          copingTips: [
            "Gunakan pendekatan 'I-statement' (fokus pada kebutuhan tim, bukan menyudutkan pribadi).",
            "Buat kesepakatan pembagian tugas tertulis sejak awal proyek.",
            "Berani menetapkan batasan tanpa harus mengorbankan ketenangan diri sendiri.",
          ],
          materiSlug: "stres-akademik",
          materiTitle: "Stres Akademik & Manajemen Beban Kuliah",
        },
      },

      ending_kerangka_solutif: {
        id: "ending_kerangka_solutif",
        narrative:
          "Dengan meminta kerangka poin utama, temanmu tidak merasa kewalahan dan tugas selesai tepat waktu tanpa ada yang merasa dikorbankan.",
        mascotMood: "senang",
        ending: {
          title: "Penyelesaian Masalah Berorientasi Solusi",
          outcome:
            "Menurunkan beban kerja menjadi potongan-potongan kecil adalah strategi koping adaptif saat situasi mendesak.",
          mascotMood: "senang",
          copingInsight:
            "Fleksibilitas kognitif membantumu mencari jalan tengah terbaik di tengah ketidakpastian.",
          copingTips: [
            "Fokus pada hal yang masih bisa dikendalikan (what can be done now).",
            "Jangan ragu menyederhanakan ekspektasi saat terjadi kendala tak terduga.",
          ],
          materiSlug: "stres-akademik",
          materiTitle: "Stres Akademik & Manajemen Beban Kuliah",
        },
      },

      ending_burnout_martir: {
        id: "ending_burnout_martir",
        narrative:
          "Tugas memang selesai, tetapi tubuhmu membayar mahal dengan kelelahan emosional dan fisik. Rasa kesal ini bisa terbawa ke hubungan pertemanan jangka panjang.",
        mascotMood: "menyemangati",
        ending: {
          title: "Pelajaran: Mengambil Semua Beban Sendirian (People-Pleasing / Martir)",
          outcome:
            "Mengerjakan segalanya sendirian sering kali muncul dari rasa cemas dan ketakutan kehilangan kendali. Nggak apa-apa, kamu sudah belajar mengenali batas energimu.",
          mascotMood: "menyemangati",
          copingInsight:
            "Kompulsi untuk memikul tanggung jawab orang lain dapat memicu burnout kronis. Menolak untuk menjadi penanggung jawab tunggal adalah hak sehatmu.",
          copingTips: [
            "Ingat bahwa kamu bertanggung jawab atas kontribusimu, bukan kelalaian orang lain.",
            "Jika rekan memang tidak kooperatif, transparanlah kepada dosen pengampu.",
            "Luangkan waktu tidur dan istirahat ekstra untuk memulihkan tenagamu hari ini.",
          ],
          materiSlug: "burnout-mahasiswa",
          materiTitle: "Burnout Mahasiswa: Kenali & Atasi",
        },
      },
    },
  },

  {
    id: "prokrastinasi-skripsi",
    title: "Terjebak Lingkaran Menunda Tugas",
    emoji: "⏳",
    category: "Prokrastinasi & Emosi",
    description:
      "Sudah membuka laptop sejak siang, tetapi setiap kali mau mengetik, rasa cemas muncul dan kamu malah scrolling media sosial berjam-jam. Apa yang kamu lakukan?",
    initialNodeId: "start",
    nodes: {
      start: {
        id: "start",
        narrative:
          "Jam di dinding sudah menunjukkan pukul 15.30. Kursor di layar Microsoft Word masih berkedip di halaman kosong. Setiap kali mau mengetik kalimat pertama, ada suara di kepalamu yang bilang: 'Nanti kalau tulisanku jelek gimana?' Kamu refleks meraih HP dan membuka Instagram lagi.",
        mascotMood: "berpikir",
        options: [
          {
            emoji: "🌿",
            text: "Sadari bahwa menunda ini bukan karena malas, tapi karena cemas. Istirahat 5 menit tarik napas.",
            nextNodeId: "sadari_emosi",
          },
          {
            emoji: "⏱️",
            text: "Gunakan aturan '5 Menit Saja': tulis draf sejelek apa pun selama 5 menit tanpa mengedit.",
            nextNodeId: "aturan_5_menit",
          },
          {
            emoji: "😣",
            text: "Marahi diri sendiri: 'Kenapa sih aku malas banget!' lalu paksa mengetik.",
            nextNodeId: "marahi_diri",
          },
        ],
      },

      sadari_emosi: {
        id: "sadari_emosi",
        narrative:
          "Kamu meletakkan HP, menutup mata, dan menarik napas dalam 3 kali. Kamu mengakui: 'Aku takut tugas ini dinilai buruk.' Mengakui perasaan itu anehnya membuat beban di dadamu terasa sedikit lebih ringan.",
        mascotMood: "tenang",
        options: [
          {
            emoji: "📝",
            text: "Mulai dengan membuat outline 3 poin sederhana tanpa memikirkan kerapian bahasa.",
            nextNodeId: "ending_self_compassion",
          },
        ],
      },

      aturan_5_menit: {
        id: "aturan_5_menit",
        narrative:
          "Kamu pasang timer 5 menit dan berjanji pada diri sendiri: 'Boleh berhenti setelah 5 menit.' Kamu mulai mengetik apa saja yang ada di kepalamu. Saat alarm berbunyi, ternyata kamu sudah menulis setengah halaman dan ingin melanjutkannya!",
        mascotMood: "senang",
        options: [
          {
            emoji: "🚀",
            text: "Lanjutkan ritme dengan teknik Pomodoro santai (25 menit kerja, 5 menit rehat).",
            nextNodeId: "ending_momentum_kecil",
          },
        ],
      },

      marahi_diri: {
        id: "marahi_diri",
        narrative:
          "Menyalahkan diri sendiri justru membuat rasa bersalah semakin menumpuk. Otakmu semakin menganggap tugas ini sebagai ancaman berbahaya, dan kamu malah merasa semakin lumpuh dan ingin kabur tidur.",
        mascotMood: "menyemangati",
        options: [
          {
            emoji: "💛",
            text: "Hentikan kritik diri dan pelajari cara berdamai dengan prokrastinasi.",
            nextNodeId: "ending_lingkaran_rasa_bersalah",
          },
        ],
      },

      ending_self_compassion: {
        id: "ending_self_compassion",
        narrative:
          "Dengan memvalidasi emosi cemasmu, perlawanan internal berkurang. Kamu berhasil menyelesaikan bab tersebut dengan kepala yang lebih adem.",
        mascotMood: "senang",
        ending: {
          title: "Kemenangan Mengelola Regulasi Emosi",
          outcome:
            "Prokrastinasi pada dasarnya adalah masalah regulasi emosi, bukan manajemen waktu semata. Menghadapinya dengan kelembutan adalah kunci keluar dari jebakan ini.",
          mascotMood: "senang",
          copingInsight:
            "Riset oleh Dr. Tim Pychyl menunjukkan bahwa memaafkan diri sendiri saat menunda terbukti meningkatkan produktivitas pada tugas berikutnya.",
          copingTips: [
            "Pisahkan antara 'menulis draf kotor' dan 'mengedit tulisan'.",
            "Turunkan standar kesempurnaan: draf yang selesai jauh lebih baik daripada draf sempurna yang tidak pernah ada.",
          ],
          materiSlug: "prokrastinasi",
          materiTitle: "Prokrastinasi & Manajemen Waktu Belajar",
        },
      },

      ending_momentum_kecil: {
        id: "ending_momentum_kecil",
        narrative:
          "Memulai adalah bagian tersulit. Begitu momentum terbentuk, otakmu menyadari bahwa tugas ini sebenarnya bisa diselesaikan.",
        mascotMood: "senang",
        ending: {
          title: "Kekuatan Langkah Mikro (Micro-Steps)",
          outcome:
            "Mengurangi hambatan awal (barrier to entry) menjadi 5 menit membuat tugas terasa tidak lagi menakutkan bagi sistem sarafmu.",
          mascotMood: "senang",
          copingInsight:
            "Hukum inersia psikologis: benda yang diam cenderung diam, tapi begitu mulai bergerak sedikit saja, ia akan lebih mudah terus melaju.",
          copingTips: [
            "Gunakan prinsip 'tulis satu kalimat saja'.",
            "Rayakan setiap progres kecil yang berhasil kamu selesaikan.",
          ],
          materiSlug: "prokrastinasi",
          materiTitle: "Prokrastinasi & Manajemen Waktu Belajar",
        },
      },

      ending_lingkaran_rasa_bersalah: {
        id: "ending_lingkaran_rasa_bersalah",
        narrative:
          "Kamu menyadari bahwa mencaci diri sendiri tidak pernah berhasil memotivasimu. Ini saatnya mengubah cara bicaramu kepada dirimu sendiri.",
        mascotMood: "menyemangati",
        ending: {
          title: "Pelajaran: Memutus Rantai Rasa Bersalah (Guilt Cycle)",
          outcome:
            "Kritik diri yang keras memicu amigdala (pusat ancaman di otak), membuatmu semakin ingin menjauh dari tugas.",
          mascotMood: "menyemangati",
          copingInsight:
            "Self-compassion (berbelas kasih pada diri sendiri) terbukti secara klinis lebih efektif mendorong motivasi jangka panjang daripada hukuman diri.",
          copingTips: [
            "Ganti kalimat 'aku malas' menjadi 'aku sedang merasa kewalahan dan itu manusiawi'.",
            "Minum air putih, lakukan peregangan ringan, dan mulai kembali dengan satu langkah termudah.",
          ],
          materiSlug: "perfeksionisme-imposter",
          materiTitle: "Perfeksionisme & Imposter Syndrome",
        },
      },
    },
  },

  {
    id: "imposter-syndrome",
    title: "Merasa 'Kurang Mampu' Saat Meraih Prestasi",
    emoji: "🌟",
    category: "Perfeksionisme & Diri",
    description:
      "Kamu baru saja diumumkan lolos program magang bergengsi. Bukannya bahagia, kepalamu malah dipenuhi bisikan: 'Ini cuma kebetulan hoki, nanti kalau mereka tahu asliku gimana?'",
    initialNodeId: "start",
    nodes: {
      start: {
        id: "start",
        narrative:
          "Surat penerimaan magang resmi ada di depan matamu. Teman-temanmu mengucapkan selamat dengan antusias. Tapi di dalam hatimu, ada kecemasan dingin yang berbisik: 'Aku nggak sepintar yang mereka kira. Bagaimana kalau nanti aku gagal total saat bekerja?'",
        mascotMood: "berpikir",
        options: [
          {
            emoji: "📊",
            text: "Uji realitas: Tuliskan fakta-fakta objektif usaha, persiapan, dan portofolio yang sudah kamu buat.",
            nextNodeId: "uji_realitas",
          },
          {
            emoji: "🗣️",
            text: "Bercerita jujur pada teman dekat atau senior tentang keraguan yang kamu rasakan.",
            nextNodeId: "cerita_teman",
          },
          {
            emoji: "🙈",
            text: "Tutup telinga, merasa panik berlebihan, dan berniat mencari alasan untuk mundur.",
            nextNodeId: "niat_mundur",
          },
        ],
      },

      uji_realitas: {
        id: "uji_realitas",
        narrative:
          "Kamu membuka buku catatan dan menuliskan: resume yang sudah kamu revisi berkali-kali, portofolio tugas kuliah yang kamu kerjakan dengan tekun, serta jawaban wawancara yang kamu latih berhari-hari. Fakta-fakta ini membuktikan bahwa kamu tidak sekadar 'beruntung'.",
        mascotMood: "tenang",
        options: [
          {
            emoji: "🌱",
            text: "Tanamkan pola pikir bertumbuh: 'Aku di sana untuk belajar, bukan untuk jadi orang yang serba tahu.'",
            nextNodeId: "ending_growth_mindset",
          },
        ],
      },

      cerita_teman: {
        id: "cerita_teman",
        narrative:
          "Saat kamu menceritakan kekhawatiranmu, temanmu tersenyum lega dan berkata: 'Sumpah, aku juga ngerasain hal yang sama persis waktu lolos organisasi kemarin!' Mendengar bahwa orang lain yang kamu anggap hebat juga merasakannya membuatmu merasa tidak sendirian.",
        mascotMood: "senang",
        options: [
          {
            emoji: "🤝",
            text: "Saling menyemangati dan berjanji saling mendampingi saat mulai magang.",
            nextNodeId: "ending_normalisasi_imposter",
          },
        ],
      },

      niat_mundur: {
        id: "niat_mundur",
        narrative:
          "Ketakutan akan kegagalan membuatmu ingin lari ke zona nyaman. Tapi di lubuk hatimu, kamu tahu kamu akan sangat menyesal jika membiarkan rasa takut ini merampas kesempatanmu untuk berkembang.",
        mascotMood: "menyemangati",
        options: [
          {
            emoji: "💡",
            text: "Tarik napas dan sadari bahwa rasa takut ini adalah tanda kamu sedang melangkah maju.",
            nextNodeId: "ending_keberanian_melangkah",
          },
        ],
      },

      ending_growth_mindset: {
        id: "ending_growth_mindset",
        narrative:
          "Kamu memasuki ruang magang dengan kerendahan hati untuk belajar, bukan beban untuk membuktikan dirimu sempurna. Sikap ini justru membuatmu disenangi mentor.",
        mascotMood: "senang",
        ending: {
          title: "Transformasi Growth Mindset",
          outcome:
            "Kamu berhasil memisahkan antara fakta kompetensi dengan bias keraguan emosionalmu.",
          mascotMood: "senang",
          copingInsight:
            "Imposter syndrome adalah pengalaman umum yang dialami lebih dari 70% profesional dan mahasiswa berprestasi. Kuncinya bukan menghilangkan rasa takut, melainkan tetap melangkah bersamanya.",
          copingTips: [
            "Akui peran keberuntungan, namun jangan abaikan persiapan dan kerja kerasmu.",
            "Ganti pertanyaan 'Apakah aku pantas?' menjadi 'Apa yang bisa kupelajari di sini?'.",
          ],
          materiSlug: "perfeksionisme-imposter",
          materiTitle: "Perfeksionisme & Imposter Syndrome",
        },
      },

      ending_normalisasi_imposter: {
        id: "ending_normalisasi_imposter",
        narrative:
          "Membuka percakapan jujur tentang kerentanan membantu menormalisasi bahwa ketidakpastian adalah bagian alami dari masa perkuliahan.",
        mascotMood: "senang",
        ending: {
          title: "Kekuatan Normalisasi Sosial",
          outcome:
            "Bicara terbuka membongkar ilusi bahwa orang lain selalu percaya diri dan tanpa rasa ragu.",
          mascotMood: "senang",
          copingInsight:
            "Dukungan sosial dari teman sebaya adalah salah satu faktor pelindung (protective factor) terkuat terhadap kecemasan akademik.",
          copingTips: [
            "Cari lingkungan yang aman untuk berbagi kerentanan tanpa takut dihakimi.",
            "Ingat bahwa perasaan tidak selalu mencerminkan kenyataan objektif.",
          ],
          materiSlug: "merasa-kesepian",
          materiTitle: "Merasa Kesepian di Kampus",
        },
      },

      ending_keberanian_melangkah: {
        id: "ending_keberanian_melangkah",
        narrative:
          "Keberanian bukanlah ketiadaan rasa takut, melainkan kesadaran bahwa ada hal berharga yang patut diperjuangkan melebihi rasa takut itu.",
        mascotMood: "menyemangati",
        ending: {
          title: "Pelajaran: Merangkul Ketidaksempurnaan",
          outcome:
            "Merasakan kecemasan adalah tanda bahwa kesempatan ini penting bagimu. Jadikan sinyal itu sebagai pengingat untuk mempersiapkan diri secara terukur.",
          mascotMood: "menyemangati",
          copingInsight:
            "Ketakutan akan evaluasi negatif sering kali dilebih-lebihkan oleh pikiran kita (spotlight effect). Pada kenyataannya, orang lain lebih fokus pada urusan mereka sendiri.",
          copingTips: [
            "Fokus pada proses hari demi hari daripada memikirkan hasil akhir berbulan-bulan ke depan.",
            "Gunakan latihan napas dalam saat rasa panik imposter menyerang.",
          ],
          materiSlug: "perfeksionisme-imposter",
          materiTitle: "Perfeksionisme & Imposter Syndrome",
        },
      },
    },
  },
];

export type Section = {
  heading: string;
  body: string[]; // tiap item = satu paragraf
};

export type Sumber = {
  label: string; // judul + lembaga/penulis
  url: string; // tautan yang sudah diverifikasi
  jenis: "jurnal" | "lembaga" | "artikel" | "buku";
  tahun?: number;
  doi?: string; // jika ada, harus nyata
  bahasa: "id" | "en";
  diverifikasi: string; // tanggal terakhir link dicek (ISO)
};

export type KategoriMateri =
  | "Stres & Kuliah"
  | "Emosi & Pikiran"
  | "Kebiasaan Sehat"
  | "Relasi";

export type LatihanSingkat = {
  judul: string;
  langkah: string[];
};

export type Materi = {
  slug: string;
  title: string;
  emoji: string;
  color: string;
  kategori: KategoriMateri;
  waktuBaca: number; // menit
  summary: string;
  sections: Section[];
  latihan: LatihanSingkat;
  kapanPerluBantuan: string;
  tingkatSensitif: "biasa" | "sensitif";
  direview: "belum" | "sudah";
  sumber: Sumber[];
};

// Update tanggal ini setiap kali link sumber dicek ulang
export const DIAKSES = "26 November 2026";

export const materi: Materi[] = [
  {
    slug: "stres-akademik",
    title: "Stres Akademik",
    emoji: "📚",
    color: "bg-sky-100",
    kategori: "Stres & Kuliah",
    waktuBaca: 4,
    summary: "Kenali stres kuliah dan cara menghadapinya",
    tingkatSensitif: "biasa",
    direview: "sudah",
    sections: [
      {
        heading: "Stres itu sebenarnya apa?",
        body: [
          "Stres adalah respons alami tubuh dan pikiran saat kita menghadapi situasi yang sulit atau menekan. Hampir semua orang pernah mengalaminya, jadi kalau kamu lagi stres karena kuliah, kamu nggak sendirian.",
          "Sedikit stres justru bisa membantu, misalnya bikin kamu lebih siap menghadapi presentasi atau ujian. Masalah muncul kalau stresnya terlalu banyak atau berlangsung lama, karena bisa memengaruhi kesehatan fisik maupun mental.",
        ],
      },
      {
        heading: "Stres di dunia kuliah",
        body: [
          "Stres akademik adalah tekanan yang datang dari tuntutan perkuliahan: tugas yang menumpuk, ujian, target nilai, skripsi, sampai ekspektasi dari dosen dan keluarga.",
          "Di bangku kuliah, tekanan ini sering bertemu dengan hal lain seperti organisasi, kerja paruh waktu, urusan keuangan, atau tinggal jauh dari rumah. Gabungan inilah yang bikin bebannya terasa berlipat-lipat.",
        ],
      },
      {
        heading: "Tanda-tanda stres",
        body: [
          "Stres bisa muncul di tubuh, misalnya sakit kepala, pusing, atau otot terasa tegang dan nyeri. Bisa juga muncul di pikiran dan perasaan, seperti sulit konsentrasi, gampang tersinggung, atau susah tidur.",
          "Cara orang bereaksi terhadap stres berbeda-beda. Jadi kalau reaksimu nggak sama dengan temanmu, itu normal. Yang penting adalah mengenali tanda-tanda yang biasa muncul pada dirimu sendiri.",
        ],
      },
      {
        heading: "Cara menghadapinya",
        body: [
          "Bergerak itu membantu. Olahraga rutin bisa mengurangi stres, dan jalan kaki santai pun sudah termasuk. Kamu nggak perlu olahraga berat untuk merasakan manfaatnya.",
          "Ngobrol dengan orang yang kamu percaya, bergabung dengan komunitas, atau mencoba mindfulness (fokus pada saat ini dan menerima pikiran tanpa menghakimi) termasuk cara-cara sehat untuk mengelola stres.",
          "Kalau berita atau media sosial bikin kamu makin tegang, coba batasi waktu mengikutinya. Hindari pelarian seperti alkohol atau rokok, karena justru bisa memperburuk keadaan.",
          "WHO juga punya panduan latihan mengelola stres berjudul Doing What Matters in Times of Stress. Menurut WHO, beberapa menit per hari saja sudah cukup untuk berlatih. Panduannya bisa kamu temukan lewat tautan sumber di bawah.",
        ],
      },
    ],
    latihan: {
      judul: "Jeda 3 Menit di Tengah Tugas",
      langkah: [
        "Berhenti menatap layar atau buku selama 3 menit.",
        "Tarik napas pelan 4 hitungan, buang pelan 6 hitungan sebanyak 5 kali.",
        "Tuliskan 1 tugas paling kecil yang bisa kamu selesaikan dalam 15 menit ke depan.",
      ],
    },
    kapanPerluBantuan:
      "Kalau stres terasa sulit dikendalikan, mengganggu tidur, makan, atau aktivitas sehari-hari, atau berlangsung lama, itu tanda bahwa kamu butuh dukungan. Bicaralah dengan orang yang kamu percaya, konselor kampus, atau tenaga kesehatan.",
    sumber: [
      {
        label: "WHO – Stress (tanya jawab)",
        url: "https://www.who.int/news-room/questions-and-answers/item/stress",
        jenis: "lembaga",
        tahun: 2023,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "WHO EMRO – Stress (lembar fakta)",
        url: "https://applications.emro.who.int/docs/WHOEMMNH236E-eng.pdf",
        jenis: "lembaga",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "WHO – Doing What Matters in Times of Stress: An Illustrated Guide",
        url: "https://www.who.int/publications/i/item/9789240003927",
        jenis: "buku",
        tahun: 2020,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
    ],
  },
  {
    slug: "cemas",
    title: "Rasa Cemas",
    emoji: "🌧️",
    color: "bg-amber-100",
    kategori: "Emosi & Pikiran",
    waktuBaca: 4,
    summary: "Memahami cemas dan cara menenangkannya",
    tingkatSensitif: "biasa",
    direview: "sudah",
    sections: [
      {
        heading: "Cemas itu wajar",
        body: [
          "Semua orang pernah merasa cemas, misalnya sebelum ujian, sidang, atau wawancara. Cemas adalah sinyal bahwa kamu peduli dan tubuhmu lagi bersiap menghadapi sesuatu yang penting.",
        ],
      },
      {
        heading: "Kapan cemas jadi masalah?",
        body: [
          "Menurut WHO, pada gangguan kecemasan rasa takut dan khawatirnya intens dan berlebihan, bukan sekadar gugup biasa. Biasanya berlangsung lama, setidaknya beberapa bulan, dan orangnya sering menghindari situasi yang memicu rasa cemas.",
          "Kecemasan yang berat bisa mengganggu kehidupan sehari-hari, termasuk kuliah, pekerjaan, pertemanan, dan keluarga. Gangguan kecemasan juga tercatat sebagai gangguan mental yang paling umum di dunia, dan gejalanya sering mulai muncul sejak masa remaja.",
        ],
      },
      {
        heading: "Gejala yang sering muncul",
        body: [
          "Di pikiran dan perilaku: sulit berkonsentrasi atau mengambil keputusan, khawatir berlebihan, dan menghindari hal-hal tertentu. Di tubuh: jantung berdebar cepat, mudah lelah, sakit kepala, nyeri otot, sakit perut, atau susah tidur.",
          "Sebagian orang mengalami serangan panik, yaitu gelombang rasa takut yang datang mendadak dengan gejala seperti sesak napas, pusing, jantung berdebar kencang, rasa tercekik, atau mual. Serangan panik terasa menakutkan, tapi biasanya mereda dan bisa dibantu penanganannya.",
          "Perlu diingat, gejala fisik seperti ini juga bisa disebabkan hal lain, misalnya masalah kesehatan tertentu atau efek zat dan obat. Karena itu, pemeriksaan oleh tenaga kesehatan penting untuk memastikan penyebabnya.",
        ],
      },
      {
        heading: "Hal yang bisa kamu coba sendiri",
        body: [
          "WHO menyebut beberapa langkah perawatan diri yang bisa membantu: berlatih mindfulness walau cuma beberapa menit per hari, berolahraga, serta mengurangi alkohol dan menghindari narkoba karena bisa memperburuk kecemasan.",
          "Belajar keterampilan mengelola stres, seperti relaksasi dan latihan napas, juga membantu meredakan gejala. Kamu bisa mencoba game Latihan Napas di menu Main.",
        ],
      },
      {
        heading: "Cemas bisa ditangani",
        body: [
          "Kabar baiknya, ada penanganan yang terbukti efektif. Terapi psikologis, terutama terapi bicara dengan profesional, termasuk penanganan utama. Pada orang dewasa, obat tertentu juga kadang dipakai, tapi keputusan itu ada di tangan dokter atau psikiater.",
          "Meski penanganannya efektif, WHO mencatat hanya sekitar 1 dari 4 orang yang membutuhkan yang benar-benar mendapat perawatan. Jadi kalau kamu merasa gejalanya mengganggu, mencari bantuan adalah langkah yang tepat.",
        ],
      },
    ],
    latihan: {
      judul: "Menapak di Saat Ini",
      langkah: [
        "Tempelkan kedua telapak kaki ke lantai dan rasakan pijakannya.",
        "Sebutkan 3 benda yang bisa kamu lihat di sekitarmu sekarang.",
        "Tarik napas pelan lewat hidung, lalu hembuskan lebih panjang lewat mulut.",
      ],
    },
    kapanPerluBantuan:
      "Jika rasa cemas berlangsung berminggu-minggu, disertai serangan panik berulang, atau membuatmu menghindari kuliah dan aktivitas penting, pertimbangkan untuk berkonsultasi dengan psikolog, konselor kampus, atau dokter.",
    sumber: [
      {
        label: "WHO – Anxiety disorders (fact sheet)",
        url: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders",
        jenis: "lembaga",
        tahun: 2023,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "WHO EMRO – Generalized anxiety disorder",
        url: "https://applications.emro.who.int/docs/WHOEMMNH231E-eng.pdf",
        jenis: "lembaga",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "Better Health Channel (Victoria, Australia) – Anxiety disorders",
        url: "https://www.betterhealth.vic.gov.au/health/ConditionsAndTreatments/anxiety-disorders",
        jenis: "lembaga",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
    ],
  },
  {
    slug: "tidur",
    title: "Tidur dan Pikiran",
    emoji: "🌙",
    color: "bg-violet-100",
    kategori: "Kebiasaan Sehat",
    waktuBaca: 4,
    summary: "Kenapa tidur penting buat kesehatan mental",
    tingkatSensitif: "biasa",
    direview: "sudah",
    sections: [
      {
        heading: "Tidur bukan cuma soal istirahat",
        body: [
          "Tidur berkualitas membantu menjaga suasana hati, kemampuan fokus, dan daya ingat. Itu sebabnya setelah begadang, kita biasanya lebih gampang kesal dan susah konsentrasi.",
        ],
      },
      {
        heading: "Hubungan dua arah",
        body: [
          "Tidur dan kesehatan mental saling memengaruhi. Kurang tidur bisa memperburuk kecemasan dan perasaan sedih. Sebaliknya, pikiran yang berpacu karena cemas bisa bikin sulit tertidur.",
          "Depresi juga bisa memengaruhi tidur dengan dua cara: sulit tidur (insomnia) atau justru tidur terlalu banyak. Karena saling terkait, memperbaiki satu sisi sering ikut membantu sisi lainnya.",
        ],
      },
      {
        heading: "Soal begadang ala mahasiswa",
        body: [
          "Sebuah penelitian yang dirangkum Stanford Medicine menemukan bahwa orang yang biasa tidur larut punya risiko lebih tinggi mengalami depresi dan kecemasan, bahkan jika jam tidur larut itu sesuai dengan kecenderungan alami mereka. Jam kerja yang tidak teratur, seperti shift bergantian, juga dikaitkan dengan risiko serupa.",
          "Ini bukan berarti sekali dua kali begadang langsung bikin gangguan mental. Yang perlu diwaspadai adalah pola jangka panjang yang berulang, apalagi kalau tidurnya jadi sangat kurang dan nggak teratur.",
        ],
      },
      {
        heading: "Kebiasaan tidur yang sehat",
        body: [
          "Para ahli menyebutnya sleep hygiene, yaitu kebiasaan dan suasana kamar yang mendukung tidur. Beberapa yang bisa dicoba: tidur dan bangun di jam yang kurang lebih sama, menciptakan kamar yang nyaman, gelap, dan tenang, serta berolahraga lebih awal di siang atau pagi hari karena olahraga malam bisa menyulitkan tubuh untuk tenang.",
          "Beberapa kebiasaan umum lain yang sering disarankan: kurangi layar HP menjelang tidur, hindari kafein di sore dan malam hari, dan jangan terus berbaring gelisah di tempat tidur. Kalau belum mengantuk, bangun sebentar dan lakukan hal tenang dulu.",
        ],
      },
    ],
    latihan: {
      judul: "Ritual 15 Menit Sebelum Tidur",
      langkah: [
        "Letakkan HP agak jauh atau aktifkan mode jangan ganggu 15 menit sebelum tidur.",
        "Redupkan lampu kamar dan duduk santai sebentar.",
        "Jika pikiran penuh soal tugas besok, tulis singkat di kertas supaya otak tidak terus mengingat-ingat.",
      ],
    },
    kapanPerluBantuan:
      "Kalau susah tidur berlangsung terus-menerus dan mengganggu aktivitasmu, atau kamu juga merasa sangat cemas atau sedih, sebaiknya bicara dengan tenaga kesehatan. Ada terapi khusus seperti CBT untuk insomnia (CBT-I) yang terbukti membantu.",
    sumber: [
      {
        label: "Mental Health Foundation (UK) – How to sleep better",
        url: "https://www.mentalhealth.org.uk/publications/how-sleep-better",
        jenis: "lembaga",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "Sleep Foundation – Sleep and mental health",
        url: "https://www.sleepfoundation.org/sleep-hygiene/mental-health",
        jenis: "artikel",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "Stanford Medicine – Sleep and mental health connection",
        url: "https://med.stanford.edu/news/insights/2025/08/sleep-mental-health-connection-what-science-says.html",
        jenis: "artikel",
        tahun: 2025,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "NIMH – Caring for Your Mental Health",
        url: "https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",
        jenis: "lembaga",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
    ],
  },
  {
    slug: "burnout",
    title: "Burnout",
    emoji: "🔋",
    color: "bg-rose-100",
    kategori: "Stres & Kuliah",
    waktuBaca: 4,
    summary: "Saat energi terasa habis terus",
    tingkatSensitif: "biasa",
    direview: "sudah",
    sections: [
      {
        heading: "Burnout itu apa?",
        body: [
          "Burnout adalah kelelahan yang muncul akibat stres kronis yang tidak berhasil dikelola. WHO memasukkannya ke dalam klasifikasi penyakit internasional (ICD-11) sebagai fenomena okupasional, yaitu terkait dunia kerja, dan bukan sebagai kondisi medis.",
          "Catatan penting: secara resmi WHO membatasi istilah burnout untuk konteks pekerjaan. Di dunia kuliah, istilah burnout akademik banyak dipakai dalam penelitian dan percakapan sehari-hari, dengan pola kelelahan yang mirip. Istilah ini bukan kategori resmi WHO, tapi bisa membantu kamu mengenali kelelahan akibat tuntutan kuliah.",
        ],
      },
      {
        heading: "Tiga tanda utamanya",
        body: [
          "WHO menggambarkan burnout lewat tiga hal. Pertama, perasaan energi terkuras atau kelelahan yang dalam. Kedua, jarak mental terhadap pekerjaan, misalnya jadi sinis atau negatif. Ketiga, menurunnya rasa efektif dalam bekerja.",
          "Kalau diterjemahkan ke kehidupan kuliah: badan dan pikiran terasa habis terus, tugas yang dulu kamu suka jadi terasa hambar atau menyebalkan, dan kamu merasa apa pun yang dikerjakan nggak ada hasilnya.",
        ],
      },
      {
        heading: "Bedanya dengan capek biasa",
        body: [
          "Capek biasa biasanya membaik setelah istirahat cukup. Burnout cenderung bertahan meski kamu sudah istirahat, dan disertai perasaan negatif terhadap aktivitasmu.",
          "Gejalanya juga bisa mirip dengan kecemasan atau gangguan suasana hati. Menurut laporan NPR tentang definisi WHO, profesional perlu menyingkirkan kemungkinan kondisi lain tersebut. Jadi kalau gejalamu berat atau berlangsung lama, jangan mendiagnosis diri sendiri. Periksakan ke profesional.",
        ],
      },
      {
        heading: "Yang bisa kamu lakukan",
        body: [
          "Kurangi beban kalau memungkinkan: pilih prioritas, bicarakan tenggat dengan dosen atau pembimbing, dan jangan ragu minta bantuan teman.",
          "Beri dirimu waktu istirahat yang sungguh-sungguh. Scroll medsos sambil rebahan biasanya belum terasa memulihkan. Coba lakukan hal yang kamu nikmati atau menenangkan.",
          "Istirahat bukan tanda lemah. Burnout bisa menimpa siapa pun, di semua bidang dan level, dan memberi waktu untuk pulih adalah bagian dari proses penyembuhan.",
        ],
      },
    ],
    latihan: {
      judul: "Audit Energi Harian",
      langkah: [
        "Tuliskan 1 hal yang paling menguras energimu minggu ini.",
        "Tuliskan 1 hal kecil yang biasanya bikin kamu merasa sedikit lebih pulih.",
        "Sisihkan minimal 20 menit hari ini untuk melakukan hal pemulih itu tanpa rasa bersalah.",
      ],
    },
    kapanPerluBantuan:
      "Kalau kelelahan sudah mengganggu kuliah, hubungan, atau kesehatanmu, atau kamu mulai merasa putus asa, bicaralah dengan konselor atau tenaga kesehatan. Kamu nggak perlu menunggu sampai benar-benar ambruk.",
    sumber: [
      {
        label: "WHO – Burn-out an \"occupational phenomenon\"",
        url: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases",
        jenis: "lembaga",
        tahun: 2019,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "WHO – Burn-out FAQ klasifikasi ICD-11",
        url: "https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon",
        jenis: "lembaga",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "NPR – WHO redefines burnout as a syndrome linked to chronic stress at work",
        url: "https://npr.org/sections/health-shots/2019/05/28/727637944/who-redefines-burnout-as-a-syndrome-linked-to-chronic-stress-at-work",
        jenis: "artikel",
        tahun: 2019,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "EPFL – Burn-out",
        url: "https://www.epfl.ch/campus/security-safety/en/sante/sante-mentale-bien-etre/mental-health/burn-out/",
        jenis: "artikel",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
    ],
  },
  {
    slug: "kesepian",
    title: "Merasa Kesepian",
    emoji: "🫂",
    color: "bg-emerald-100",
    kategori: "Relasi",
    waktuBaca: 4,
    summary: "Kesepian itu umum, dan ada cara menghadapinya",
    tingkatSensitif: "biasa",
    direview: "sudah",
    sections: [
      {
        heading: "Kesepian itu umum",
        body: [
          "Menurut Komisi WHO tentang Koneksi Sosial, sekitar 1 dari 6 orang di dunia mengalami kesepian. Siapa pun, di mana pun, bisa merasakannya, termasuk mahasiswa yang dikelilingi banyak orang di kampus.",
          "Merantau untuk kuliah, pindah lingkungan, atau merasa belum menemukan lingkaran yang cocok adalah situasi yang sering memicu rasa kesepian.",
        ],
      },
      {
        heading: "Kesepian dan sendirian itu beda",
        body: [
          "Kesepian adalah perasaan kurang terhubung dengan orang lain, sedangkan isolasi sosial berarti sedikitnya kontak dengan orang lain. WHO menyebut keduanya sebagai bentuk keterputusan sosial.",
          "Kamu bisa sendirian tapi merasa baik-baik saja, dan sebaliknya bisa merasa sangat kesepian di tengah keramaian. Yang menentukan adalah kualitas rasa terhubungnya, bukan jumlah orang di sekitarmu.",
        ],
      },
      {
        heading: "Kenapa perlu diperhatikan?",
        body: [
          "WHO menyatakan kesepian dan isolasi sosial berdampak pada kesehatan mental, seperti depresi dan kecemasan, juga pada kesehatan fisik, misalnya penyakit jantung dan diabetes tipe 2. Sebaliknya, koneksi sosial yang baik bisa melindungi kesehatan sepanjang hidup.",
          "Tujuannya bukan menakut-nakuti. Poinnya, rasa kesepian itu nyata dan layak ditanggapi serius, bukan sesuatu yang cukup diabaikan sambil berharap hilang sendiri.",
        ],
      },
      {
        heading: "Langkah kecil untuk terhubung",
        body: [
          "Mulai dari yang kecil. Kabari satu orang yang kamu nyaman, ajak teman makan atau belajar bareng, atau ikut satu kegiatan yang sesuai minatmu, seperti UKM, komunitas, atau kegiatan keagamaan. Satu hubungan yang bermakna sering lebih berarti daripada banyak kenalan.",
          "Media sosial bisa membantu tetap terhubung dengan orang yang jauh. Tapi WHO juga mengingatkan perlunya waspada terhadap waktu layar yang berlebihan dan interaksi online yang negatif karena bisa memengaruhi kesejahteraan, terutama pada anak muda.",
          "Kalau mengajak orang terasa menakutkan, itu wajar. Kamu boleh mulai dengan pesan singkat, dan nggak harus langsung bertemu.",
        ],
      },
    ],
    latihan: {
      judul: "Satu Pesan Hangat Hari Ini",
      langkah: [
        "Pikirkan satu orang (teman lama, keluarga, atau teman kos) yang membuatmu nyaman.",
        "Kirim pesan singkat yang sederhana, misalnya menanyakan kabar atau berbagi hal ringan.",
        "Apresiasi dirimu karena sudah mengambil satu langkah kecil untuk terhubung.",
      ],
    },
    kapanPerluBantuan:
      "Kalau rasa kesepian bikin kamu terus-menerus sedih, menarik diri, atau kehilangan semangat, cobalah bicara dengan konselor atau tenaga kesehatan. Kamu berhak mendapat dukungan, dan kamu nggak harus melewatinya sendirian.",
    sumber: [
      {
        label: "WHO – Commission on Social Connection",
        url: "https://www.who.int/groups/commission-on-social-connection",
        jenis: "lembaga",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "WHO – Social connection linked to improved health",
        url: "https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death",
        jenis: "lembaga",
        tahun: 2025,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "WHO – From loneliness to social connection (ringkasan laporan)",
        url: "https://www.who.int/publications/m/item/from-loneliness-to-social-connection-summary",
        jenis: "lembaga",
        tahun: 2025,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
    ],
  },
  {
    slug: "mengenal-emosi",
    title: "Mengenal dan Menamai Emosi",
    emoji: "🎭",
    color: "bg-sky-100",
    kategori: "Emosi & Pikiran",
    waktuBaca: 3,
    summary: "Memahami apa yang sebenarnya kamu rasakan tanpa menghakimi",
    tingkatSensitif: "biasa",
    direview: "belum",
    sections: [
      {
        heading: "Kenapa menamai emosi itu penting?",
        body: [
          "Sering kali kita cuma bilang \"aku lagi bad mood\" atau \"rasanya nggak enak aja\". Padahal di balik satu label umum itu, ada emosi yang lebih spesifik—misalnya kecewa, kewalahan, malu, atau khawatir.",
          "Dalam psikologi, kemampuan membedakan emosi secara spesifik membantu kita lebih mudah memahami kebutuhan diri dan memilih respons yang lebih tepat.",
        ],
      },
      {
        heading: "Tidak ada emosi yang 'salah'",
        body: [
          "Emosi seperti sedih, marah, atau cemas sering dicap negatif, padahal semuanya adalah sinyal alami. Sedih menandakan ada sesuatu yang berharga bagimu, marah bisa muncul saat batasanmu terasa dilanggar, dan cemas mengingatkan bahwa ada hal penting di depan.",
          "Menamai emosi dengan kalimat sederhana seperti \"saat ini aku sedang merasa kecewa\" membantu menciptakan jarak yang sehat antara dirimu dan perasaan yang sedang lewat.",
        ],
      },
      {
        heading: "Melatih kepekaan emosi",
        body: [
          "Kamu bisa mulai dengan memperhatikan sinyal tubuh: dada terasa sesak, bahu tegang, atau perut terasa nggak nyaman. Dari situ, coba cari kata yang paling mendekati perasaanmu saat ini.",
          "Kalau masih bingung, kamu juga bisa berlatih lewat game Tebak Emosi di menu Main untuk mengenali berbagai nuansa perasaan sehari-hari.",
        ],
      },
    ],
    latihan: {
      judul: "Cek Emosi 30 Detik",
      langkah: [
        "Berhenti sejenak dan perhatikan sensasi di tubuhmu (bahu, napas, perut).",
        "Lengkapi kalimat ini di dalam hati: \"Saat ini aku merasa ... karena ...\".",
        "Terima perasaan itu tanpa menghakimi, lalu pilih satu langkah kecil yang kamu butuhkan sekarang.",
      ],
    },
    kapanPerluBantuan:
      "Jika emosi terasa terlalu kuat hingga sulit dikendalikan, membuatmu sering meledak atau justru mati rasa dalam waktu lama, cobalah berdiskusi dengan konselor kampus atau psikolog.",
    sumber: [
      {
        label: "APA – Emotions (topik psikologi)",
        url: "https://www.apa.org/topics/emotions",
        jenis: "lembaga",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "WHO – Mental health: strengthening our response",
        url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
        jenis: "lembaga",
        tahun: 2022,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "NIMH – Caring for Your Mental Health",
        url: "https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",
        jenis: "lembaga",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
    ],
  },
  {
    slug: "prokrastinasi",
    title: "Prokrastinasi dan Waktu Belajar",
    emoji: "⏳",
    color: "bg-amber-100",
    kategori: "Stres & Kuliah",
    waktuBaca: 4,
    summary: "Kenapa kita sering menunda tugas dan cara memutus siklusnya",
    tingkatSensitif: "biasa",
    direview: "belum",
    sections: [
      {
        heading: "Bukan sekadar malas",
        body: [
          "Banyak mahasiswa mengira menunda tugas berarti malas atau kurang disiplin. Padahal dalam penelitian psikologi yang dirangkum APA, prokrastinasi sering kali berkaitan dengan cara kita mengelola emosi yang nggak nyaman—seperti takut gagal, bosan, atau bingung harus mulai dari mana.",
          "Menunda memberi rasa lega sesaat karena kita menghindari tugas yang terasa berat. Namun ketika tenggat makin dekat, stresnya justru menumpuk berkali-kali lipat.",
        ],
      },
      {
        heading: "Kenapa tugas kuliah sering ditunda?",
        body: [
          "Tugas besar seperti makalah atau skripsi sering terasa terlalu kabur dan berat jika dilihat sekaligus. Otak kita cenderung menghindar saat sesuatu terasa mengancam atau membingungkan.",
          "Rasa takut hasilnya nggak sempurna juga sering bikin seseorang menunda untuk memulai.",
        ],
      },
      {
        heading: "Cara mulai tanpa terasa berat",
        body: [
          "Pecah tugas besar menjadi langkah yang sangat kecil—misalnya cukup buka dokumen dan tulis judul atau 3 poin kerangka saja.",
          "Fokus pada durasi singkat (misalnya 15–20 menit), bukan langsung menargetkan selesai sempurna. Selain itu, bersikap ramah pada diri sendiri saat pernah menunda justru membantu memutus siklus stres dan rasa bersalah.",
        ],
      },
    ],
    latihan: {
      judul: "Aturan 10 Menit Pertama",
      langkah: [
        "Pilih satu tugas kuliah yang paling sering kamu tunda.",
        "Pasang pengatur waktu 10 menit dan berjanji hanya mengerjakan bagian paling kecilnya saja.",
        "Setelah 10 menit, kamu bebas berhenti atau lanjut jika sudah mulai mengalir.",
      ],
    },
    kapanPerluBantuan:
      "Jika kebiasaan menunda disertai rasa cemas berat, sulit fokus berkepanjangan, atau membuatmu tertinggal jauh dalam kuliah, kamu bisa berkonsultasi dengan dosen wali, layanan konseling kampus, atau psikolog.",
    sumber: [
      {
        label: "APA Monitor – Procrastination and emotion regulation",
        url: "https://www.apa.org/monitor/2018/05/procrastination",
        jenis: "artikel",
        tahun: 2018,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "APA – Procrastination research overview",
        url: "https://www.apa.org/news/press/releases/2010/04/procrastination",
        jenis: "lembaga",
        tahun: 2010,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "Kemenkes RI – Portal Ayo Sehat (pengelolaan stres & gaya hidup)",
        url: "https://ayosehat.kemkes.go.id",
        jenis: "lembaga",
        bahasa: "id",
        diverifikasi: "2026-11-26",
      },
    ],
  },
  {
    slug: "perfeksionisme-imposter",
    title: "Perfeksionisme & Imposter Syndrome",
    emoji: "🪞",
    color: "bg-violet-100",
    kategori: "Emosi & Pikiran",
    waktuBaca: 4,
    summary: "Saat standar terlalu tinggi bikin kamu merasa tidak pernah cukup",
    tingkatSensitif: "biasa",
    direview: "belum",
    sections: [
      {
        heading: "Standar tinggi vs perfeksionisme",
        body: [
          "Punya target dan berusaha sebaik mungkin itu hal yang positif. Namun perfeksionisme muncul ketika standar yang dipasang terasa tidak realistis dan kesalahan kecil langsung dianggap sebagai kegagalan total.",
          "Dalam kajian literatur akademik, perfeksionisme yang kaku sering berkaitan erat dengan stres berkepanjangan dan kelelahan belajar.",
        ],
      },
      {
        heading: "Apa itu imposter syndrome?",
        body: [
          "Imposter phenomenon (sering disebut imposter syndrome) adalah perasaan bahwa pencapaianmu selama ini hanya kebetulan atau keberuntungan, dan suatu saat orang lain akan tahu kamu \"tidak sepintar yang mereka kira\".",
          "Perasaan ini sangat umum dialami mahasiswa, terutama saat masuk lingkungan baru yang kompetitif atau saat mengerjakan tugas besar. Merasa seperti itu bukan berarti kamu benar-benar tidak mampu.",
        ],
      },
      {
        heading: "Belajar cukup baik itu sudah cukup",
        body: [
          "Coba bedakan antara fakta dan kritik diri. Catat usaha nyata yang sudah kamu lakukan untuk mencapai titik sekarang, bukan sekadar menganggapnya kebetulan.",
          "Ingat bahwa proses belajar memang melibatkan kesalahan dan revisi. Mengizinkan diri untuk bertumbuh pelan-pelan jauh lebih sehat daripada mengejar kesempurnaan.",
        ],
      },
    ],
    latihan: {
      judul: "Catatan Bukti Nyata",
      langkah: [
        "Tuliskan 1 pencapaian atau tugas yang berhasil kamu selesaikan baru-baru ini.",
        "Tuliskan 2 usaha konkret yang kamu lakukan untuk mencapainya (misalnya begadang menyusun draf, bertanya ke teman).",
        "Ingatkan diri: hasil itu datang dari usahamu, bukan semata keberuntungan.",
      ],
    },
    kapanPerluBantuan:
      "Jika rasa takut salah dan keraguan diri membuatmu terus-menerus cemas, kelelahan, atau takut mencoba hal baru di kampus, berbicara dengan konselor atau psikolog bisa sangat membantu.",
    sumber: [
      {
        label: "Thomas & Bigatti (2020) – Perfectionism, impostor phenomenon, and mental health in medicine (PMC)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7882132/",
        jenis: "jurnal",
        tahun: 2020,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "APA – Perfectionism",
        url: "https://www.apa.org/topics/perfectionism",
        jenis: "lembaga",
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
      {
        label: "APA gradPSYCH – Feel like a fraud?",
        url: "https://www.apa.org/gradpsych/2013/11/fraud",
        jenis: "artikel",
        tahun: 2013,
        bahasa: "en",
        diverifikasi: "2026-11-26",
      },
    ],
  },
];

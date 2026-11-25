export type Section = {
  heading: string;
  body: string[]; // tiap item = satu paragraf
};

export type Sumber = {
  label: string;
  url: string;
};

export type Materi = {
  slug: string;
  title: string;
  emoji: string;
  color: string;
  summary: string;
  sections: Section[];
  sumber: Sumber[];
};

// Update tanggal ini setiap kali link sumber dicek ulang
export const DIAKSES = "25 November 2026";

export const materi: Materi[] = [
  {
    slug: "stres-akademik",
    title: "Stres Akademik",
    emoji: "📚",
    color: "bg-sky-100",
    summary: "Kenali stres kuliah dan cara menghadapinya",
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
      {
        heading: "Kapan perlu minta bantuan?",
        body: [
          "Kalau stres terasa sulit dikendalikan, mengganggu tidur, makan, atau aktivitas sehari-hari, atau berlangsung lama, itu tanda bahwa kamu butuh dukungan. Bicaralah dengan orang yang kamu percaya atau tenaga kesehatan. Meminta bantuan bukan tanda lemah.",
        ],
      },
    ],
    sumber: [
      {
        label: "WHO – Stress (tanya jawab, Bahasa Inggris)",
        url: "https://www.who.int/news-room/questions-and-answers/item/stress",
      },
      {
        label: "WHO EMRO – Stress (lembar fakta, Bahasa Inggris)",
        url: "https://applications.emro.who.int/docs/WHOEMMNH236E-eng.pdf",
      },
    ],
  },
  {
    slug: "cemas",
    title: "Rasa Cemas",
    emoji: "🌧️",
    color: "bg-amber-100",
    summary: "Memahami cemas dan cara menenangkannya",
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
    sumber: [
      {
        label: "WHO – Anxiety disorders (fact sheet, Bahasa Inggris)",
        url: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders",
      },
      {
        label: "WHO EMRO – Generalized anxiety disorder (Bahasa Inggris)",
        url: "https://applications.emro.who.int/docs/WHOEMMNH231E-eng.pdf",
      },
      {
        label: "Better Health Channel (Victoria, Australia) – Anxiety disorders (Bahasa Inggris)",
        url: "https://www.betterhealth.vic.gov.au/health/ConditionsAndTreatments/anxiety-disorders",
      },
    ],
  },
  {
    slug: "tidur",
    title: "Tidur dan Pikiran",
    emoji: "🌙",
    color: "bg-violet-100",
    summary: "Kenapa tidur penting buat kesehatan mental",
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
      {
        heading: "Kapan perlu ke profesional?",
        body: [
          "Kalau susah tidur berlangsung terus-menerus dan mengganggu aktivitasmu, atau kamu juga merasa sangat cemas atau sedih, sebaiknya bicara dengan tenaga kesehatan. Ada terapi khusus yang disebut CBT untuk insomnia (CBT-I), yang terbukti membantu mengurangi masalah tidur.",
          "Menangani masalah tidur bersamaan dengan perawatan kesehatan mental juga disebut bisa memberi hasil yang lebih baik.",
        ],
      },
    ],
    sumber: [
      {
        label: "Mental Health Foundation (UK) – How to sleep better (Bahasa Inggris)",
        url: "https://www.mentalhealth.org.uk/publications/how-sleep-better",
      },
      {
        label: "Sleep Foundation – Sleep and mental health (Bahasa Inggris)",
        url: "https://www.sleepfoundation.org/sleep-hygiene/mental-health",
      },
      {
        label: "Stanford Medicine – Sleep and mental health connection (Bahasa Inggris)",
        url: "https://med.stanford.edu/news/insights/2025/08/sleep-mental-health-connection-what-science-says.html",
      },
      {
        label: "Michigan Medicine – The link between sleep and mental health (Bahasa Inggris)",
        url: "https://medschool.umich.edu/health-lab/link-between-sleep-and-mental-health",
      },
    ],
  },
  {
    slug: "burnout",
    title: "Burnout",
    emoji: "🔋",
    color: "bg-rose-100",
    summary: "Saat energi terasa habis terus",
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
      {
        heading: "Kapan perlu bantuan?",
        body: [
          "Kalau kelelahan sudah mengganggu kuliah, hubungan, atau kesehatanmu, atau kamu mulai merasa putus asa, bicaralah dengan konselor atau tenaga kesehatan. Kamu nggak perlu menunggu sampai benar-benar ambruk.",
        ],
      },
    ],
    sumber: [
      {
        label: "WHO – Burn-out an \"occupational phenomenon\" (Bahasa Inggris)",
        url: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases",
      },
      {
        label: "WHO – Burn-out FAQ klasifikasi ICD-11 (Bahasa Inggris)",
        url: "https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon",
      },
      {
        label: "NPR – WHO redefines burnout as a syndrome linked to chronic stress at work (Bahasa Inggris)",
        url: "https://npr.org/sections/health-shots/2019/05/28/727637944/who-redefines-burnout-as-a-syndrome-linked-to-chronic-stress-at-work",
      },
      {
        label: "EPFL – Burn-out (Bahasa Inggris)",
        url: "https://www.epfl.ch/campus/security-safety/en/sante/sante-mentale-bien-etre/mental-health/burn-out/",
      },
    ],
  },
  {
    slug: "kesepian",
    title: "Merasa Kesepian",
    emoji: "🫂",
    color: "bg-emerald-100",
    summary: "Kesepian itu umum, dan ada cara menghadapinya",
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
      {
        heading: "Kalau kesepiannya terasa berat",
        body: [
          "Kalau rasa kesepian bikin kamu terus-menerus sedih, menarik diri, atau kehilangan semangat, cobalah bicara dengan konselor atau tenaga kesehatan. Kamu berhak mendapat dukungan, dan kamu nggak harus melewatinya sendirian.",
        ],
      },
    ],
    sumber: [
      {
        label: "WHO – Commission on Social Connection (Bahasa Inggris)",
        url: "https://www.who.int/groups/commission-on-social-connection",
      },
      {
        label: "WHO – Social connection linked to improved health (siaran pers, Bahasa Inggris)",
        url: "https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death",
      },
      {
        label: "WHO – Ringkasan laporan dalam bahasa sederhana (Bahasa Inggris)",
        url: "https://www.who.int/publications/m/item/from-loneliness-to-social-connection-summary",
      },
    ],
  },
];
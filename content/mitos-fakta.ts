export type MitosFaktaItem = {
  pernyataan: string;
  jawaban: "fakta" | "mitos";
  penjelasan: string;
  /** slug materi terkait (opsional, link ke /belajar/[slug]) */
  materiTerkait?: string;
};

/**
 * Daftar pernyataan seputar kesehatan mental.
 * Setiap item sudah ditinjau agar tidak mengandung klaim medis yang bersifat diagnosis.
 * Sumber: WHO, Kemenkes RI, NIMH, APA — referensi lengkap di materi terkait.
 */
export const mitosFaktaItems: MitosFaktaItem[] = [
  {
    pernyataan: "Stres itu selalu buruk dan harus dihindari.",
    jawaban: "mitos",
    penjelasan:
      "Stres ringan (eustress) bisa membantu kamu fokus dan termotivasi. Yang perlu diwaspadai adalah stres berkepanjangan yang mengganggu aktivitas sehari-hari.",
    materiTerkait: "stres-akademik",
  },
  {
    pernyataan: "Olahraga teratur bisa membantu mengurangi gejala kecemasan.",
    jawaban: "fakta",
    penjelasan:
      "Penelitian menunjukkan bahwa aktivitas fisik melepaskan endorfin dan membantu menurunkan hormon stres. Bahkan jalan kaki 30 menit sudah bisa membuat perbedaan.",
    materiTerkait: "rasa-cemas",
  },
  {
    pernyataan: "Orang yang kuat mentalnya tidak pernah merasa cemas.",
    jawaban: "mitos",
    penjelasan:
      "Rasa cemas adalah respons alami tubuh. Semua orang, termasuk yang terlihat 'kuat', bisa merasakannya. Yang membedakan adalah bagaimana kita meresponsnya.",
    materiTerkait: "rasa-cemas",
  },
  {
    pernyataan: "Kurang tidur bisa memperburuk kesehatan mental.",
    jawaban: "fakta",
    penjelasan:
      "Tidur yang cukup sangat penting untuk regulasi emosi dan fungsi kognitif. Kurang tidur kronis dikaitkan dengan peningkatan risiko masalah kesehatan mental.",
    materiTerkait: "tidur-dan-pikiran",
  },
  {
    pernyataan: "Curhat itu tanda kelemahan.",
    jawaban: "mitos",
    penjelasan:
      "Berbicara tentang perasaan justru merupakan tanda keberanian dan langkah penting untuk menjaga kesehatan mental. Memendam perasaan justru bisa memperburuk kondisi.",
    materiTerkait: "merasa-kesepian",
  },
  {
    pernyataan: "Burnout bukan cuma capek biasa, tapi kelelahan emosional yang berkepanjangan.",
    jawaban: "fakta",
    penjelasan:
      "WHO mendefinisikan burnout sebagai sindrom akibat stres kronis di tempat kerja atau studi yang tidak berhasil dikelola, ditandai kelelahan, perasaan negatif, dan penurunan produktivitas.",
    materiTerkait: "burnout-mahasiswa",
  },
  {
    pernyataan: "Kesehatan mental hanya masalah orang dewasa, mahasiswa terlalu muda untuk mengalaminya.",
    jawaban: "mitos",
    penjelasan:
      "Justru masa transisi kuliah (18–25 tahun) adalah periode rentan. Tekanan akademik, sosial, dan finansial bisa mempengaruhi kesehatan mental siapa pun tanpa memandang usia.",
  },
  {
    pernyataan:
      "Teknik grounding (seperti 5-4-3-2-1) bisa membantu meredakan kecemasan akut.",
    jawaban: "fakta",
    penjelasan:
      "Teknik grounding membantu mengalihkan fokus dari pikiran cemas ke panca indera, sehingga sistem saraf bisa kembali tenang. Ini sering direkomendasikan oleh profesional kesehatan mental.",
    materiTerkait: "rasa-cemas",
  },
  {
    pernyataan: "Prokrastinasi berarti kamu malas.",
    jawaban: "mitos",
    penjelasan:
      "Prokrastinasi sering kali terkait dengan regulasi emosi, bukan kemalasan. Orang menunda karena takut gagal, perfeksionisme, atau merasa kewalahan.",
    materiTerkait: "prokrastinasi",
  },
  {
    pernyataan: "Imposter syndrome hanya dialami orang yang tidak kompeten.",
    jawaban: "mitos",
    penjelasan:
      "Justru imposter syndrome lebih sering dialami orang berprestasi. Perasaan 'tidak pantas' ini umum dan tidak mencerminkan kemampuan sebenarnya.",
    materiTerkait: "perfeksionisme-imposter",
  },
  {
    pernyataan: "Latihan pernapasan dalam bisa membantu menurunkan detak jantung saat cemas.",
    jawaban: "fakta",
    penjelasan:
      "Napas dalam mengaktifkan sistem saraf parasimpatik yang membantu tubuh rileks. Ini adalah teknik sederhana yang sudah terbukti efektif secara ilmiah.",
  },
  {
    pernyataan: "Meminta bantuan profesional berarti kamu gagal mengatasi masalahmu sendiri.",
    jawaban: "mitos",
    penjelasan:
      "Mencari bantuan profesional adalah tanda keberanian dan kepedulian pada diri sendiri. Seperti pergi ke dokter saat sakit fisik, konseling adalah langkah cerdas untuk kesehatan mental.",
  },
];

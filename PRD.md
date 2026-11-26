# PRD: Website Edukasi Kesehatan Mental untuk Mahasiswa (PKM)

Dokumen ini adalah acuan kerja untuk AI agent (Antigravity) dan developer. Simpan sebagai `PRD.md` di root project, lalu minta agent membacanya sebelum mengerjakan apa pun.

## 0. Cara pakai di Antigravity

1. Taruh file ini di root project sebagai `PRD.md` (sejajar `AGENTS.md`).
2. Kalau tersedia di versimu, aktifkan mode Planning supaya agent menyusun rencana dulu sebelum menulis kode.
3. Kerjakan **satu fase per prompt**, jangan semuanya sekaligus. Tiap fase selesai, jalankan `npm run build`, cek di HP, baru lanjut.

## 1. Ringkasan produk

- **Nama website**: `ISI: nama website` (placeholder; jangan hardcode di banyak tempat, simpan di `content/tentang.ts`)
- **Apa ini**: website edukasi kesehatan mental berbasis mobile untuk mahasiswa. Isinya materi singkat berbasis sumber ilmiah, game relaksasi, dan informasi bantuan. Dibuat sebagai luaran PKM oleh mahasiswa S1 Keperawatan bersama developer.
- **Tujuan**:
  - Meningkatkan literasi kesehatan mental mahasiswa dengan cara yang santai, tidak menggurui.
  - Memberi latihan sederhana yang bisa langsung dipakai (napas, grounding, refleksi).
  - Memudahkan mahasiswa menemukan bantuan profesional saat dibutuhkan.
- **Bukan tujuan**: mendiagnosis, menggantikan psikolog atau psikiater, atau mengumpulkan data pribadi pengguna.
- **Target pengguna**: mahasiswa (sekitar 18-25 tahun). Pengguna utama membuka lewat HP (layar sekitar 360-430 px).

## 2. Kondisi saat ini (sudah ada, jangan dibuat ulang)

- **Stack**: Next.js 16 (App Router, TypeScript), Tailwind CSS v4, Framer Motion, font Nunito, deploy di Vercel (Hobby, gratis). Folder `app/`, `components/`, `content/` ada di root (tanpa `src/`). Alias `@/` menunjuk ke root.
- **Halaman**: Beranda (`/`), Belajar (`/belajar`, `/belajar/[slug]`), Main (`/main` dengan `/main/napas`, `/main/emosi`, `/main/afirmasi`), Butuh Bantuan (`/bantuan`), Tentang (`/tentang`).
- **Komponen**: `Mascot` (maskot awan SVG), `Onboarding` (tutorial 3 slide, status di localStorage), `MenuCard`, `FloatingClouds`, `PageShell` (pembungkus gradasi per halaman).
- **Konten**: `content/materi.ts` (5 materi: stres akademik, cemas, tidur, burnout, kesepian, masing-masing punya sumber berupa label + URL) dan `content/tentang.ts`.
- **Aturan teknis yang sudah ditemukan (wajib dipatuhi)**:
  - Tailwind v4: pakai `bg-linear-to-b`, `perspective-[1000px]`, `transform-3d`, `backface-hidden`.
  - Lint React baru melarang `setState` langsung di dalam `useEffect`. Untuk membaca `localStorage` gunakan `useSyncExternalStore` (lihat `Onboarding.tsx`).
  - Next.js di project ini versi baru dan punya `AGENTS.md`. Ikuti isinya karena API bisa berbeda dari pengetahuan umum.
  - Parameter route dinamis di Next.js 16 berbentuk `Promise` (`await params`).

## 3. Aturan kerja agent (wajib)

1. Satu fase per sesi, satu fitur/file per langkah. Jangan mengubah banyak file sekaligus tanpa rencana. Setelah tiap langkah, jelaskan apa yang berubah.
2. Jangan menghapus atau menimpa konten yang sudah ada (materi, data Tentang) kecuali diminta.
3. Selalu jalankan `npm run build` dan `npm run lint` di akhir fase. Perbaiki error sebelum melapor.
4. Tanpa backend berbayar, tanpa database, tanpa login. Data pribadi pengguna tidak boleh dikirim ke server mana pun.
5. Jangan membuat konten medis dari ingatan. Semua klaim kesehatan harus punya sumber yang dikutip (lihat bagian 7). Jika tidak yakin, tandai `perlu-verifikasi` dan jangan tampilkan ke publik.
6. Jangan mengarang URL, DOI, judul jurnal, nama penulis, atau statistik. Semua link wajib dicek benar-benar bisa dibuka.
7. Jangan memakai karakter, gambar, musik, atau font yang berhak cipta tanpa lisensi jelas (contoh: karakter kartun terkenal). Gunakan aset orisinal atau berlisensi bebas (CC0, MIT, OFL) dan catat sumbernya di `CREDITS.md`.
8. Dilarang membuat fitur yang mendiagnosis (skor yang menyimpulkan seseorang depresi atau cemas). Fitur refleksi harus berbahasa netral.
9. Jika ada keputusan desain atau konten yang ambigu, tanya dulu daripada menebak.

## 4. Prinsip desain dan animasi

- **Nuansa**: tenang, hangat, modern, tidak kekanak-kanakan. Warna lembut bergradasi, sudut membulat, banyak ruang kosong, ilustrasi ramah.
- **Design tokens** (buat satu sumber kebenaran): palet warna per tone (sky, amber, rose, emerald, violet) dan netral, skala tipografi (Nunito), radius, bayangan, durasi dan easing animasi. Simpan di `app/globals.css` (variabel CSS/ `@theme`) dan pakai konsisten.
- **Prinsip animasi**:
  - Animasi harus **menenangkan**, bukan mengejutkan: durasi 250-600 ms untuk transisi UI, 3-14 detik untuk gerak ambient yang pelan. Easing lembut.
  - **Dilarang** berkedip cepat, flash, parallax agresif, atau gerak yang berlebihan. Ini tema kesehatan mental.
  - Animasikan hanya `transform` dan `opacity` supaya tetap 60 fps di HP kelas menengah.
  - Batasi jumlah elemen yang beranimasi bersamaan di satu layar.
  - **Wajib menghormati `prefers-reduced-motion`** dan sediakan toggle **Mode Tenang** di UI (mematikan animasi ambient dan mengurangi transisi), tersimpan di `localStorage`.
  - Suara **mati secara default**. Getaran (haptic) opsional dan bisa dimatikan.
- **Maskot**: karakter orisinal (saat ini Awan). Siapkan beberapa ekspresi/state (senang, tenang, menyemangati, berpikir, tidur) sebagai komponen yang bisa dipakai di tutorial, game, dan hasil kuis. Jika nanti diganti ilustrasi lain, cukup ubah satu komponen.

## 5. Roadmap per fase

### Fase 0: Fondasi (kerjakan pertama)
- Design tokens dan penyatuan gaya (warna, radius, bayangan, durasi animasi).
- `BottomNav` (bilah navigasi bawah di mobile: Beranda, Belajar, Main, Bantuan, Tentang) dipasang di layout global.
- **Tombol bantuan cepat** yang selalu terlihat dan halus (bukan alarm): mengarah ke `/bantuan`.
- Toggle **Mode Tenang** + penghormatan `prefers-reduced-motion` di seluruh komponen animasi yang ada.
- Halaman `not-found` (404) dan `error` yang ramah, dengan maskot.
- Rapikan `PageShell`: dukung tone tambahan, safe-area HP, dan transisi masuk halaman.
- Rapikan tiga halaman game yang belum memakai `PageShell` (napas, emosi, afirmasi).
- Buat `CREDITS.md` dan `lib/storage.ts` (helper localStorage aman: versi skema, try/catch, hook `useSyncExternalStore`).
- **Selesai jika**: build dan lint lulus, semua halaman tampil benar di lebar 360 px, Mode Tenang bekerja, tidak ada konten yang hilang.

### Fase 1: Visual dan animasi
- Beranda baru: hero dengan maskot yang bereaksi (kedip, melambai saat disentuh), sapaan sesuai waktu (pagi/siang/malam), kartu menu yang lebih hidup, dekorasi ambient halus.
- Transisi antar halaman yang lembut (fade/slide ringan).
- Mikro-interaksi: tombol, kartu, progress, konfeti lembut atau bintang kecil saat menyelesaikan sesuatu (singkat, bisa dimatikan).
- Ilustrasi SVG orisinal untuk tiap topik materi (menggantikan emoji sebagai visual utama; emoji boleh tetap sebagai aksen).
- Skeleton/loading yang halus bila ada konten berat.
- Mode gelap opsional (toggle) dengan warna yang tetap lembut.
- Penyempurnaan Onboarding: ilustrasi per slide, bisa dilewati, dan bisa diputar ulang dari menu Tentang atau Pengaturan.

### Fase 2: Konten materi tahap 1
- Perluas 5 materi yang ada (lihat bagian 7) dan tambah topik baru prioritas (bagian 6.3).
- Tiap materi memiliki: ringkasan, estimasi waktu baca, bagian "Coba ini" (latihan kecil), bagian "Kapan perlu bantuan", dan daftar sumber (bagian 7).
- Fitur di halaman Belajar: pencarian, filter kategori, penanda materi yang sudah dibaca, dan simpan/favorit (localStorage).
- Skrip verifikasi link sumber (lihat bagian 7.4).

### Fase 3: Game tahap 1
- Buat/upgrade game berikut (detail di bagian 6.2): Latihan Napas v2, Grounding 5-4-3-2-1, Mitos atau Fakta. Semua mengikuti prinsip animasi dan Mode Tenang.

### Fase 4: Fitur personal (semua lokal di perangkat)
- Cek Perasaan Harian: pilih mood dengan maskot dan catatan singkat opsional; riwayat berbentuk kalender atau grafik sederhana (khusus perangkat itu).
- Catatan Harian (diary pribadi, bukan jurnal ilmiah): tulis refleksi dengan prompt ringan. Tersimpan hanya di localStorage, dengan tombol ekspor dan hapus semua data.
- Progres dan lencana: materi dibaca, game dimainkan, latihan selesai. **Tanpa streak yang menghukum** dan tanpa kalimat bernada menyalahkan jika pengguna absen.
- Favorit: materi dan afirmasi yang disimpan.
- Halaman Pengaturan: Mode Tenang, mode gelap, ukuran teks, suara, getaran, hapus semua data lokal, putar ulang tutorial.

### Fase 5: Game tahap 2 dan materi tahap 2
- Game: Cerita Interaktif, Gelembung Pikiran, Kartu Memori Coping, Mewarnai Mandala, Rencana Hari Ini (detail di 6.2).
- Materi topik tambahan sisa daftar 6.3.

### Fase 6: Rilis dan jangkauan
- **PWA**: bisa dipasang di layar utama dan tetap membuka materi saat offline.
- SEO dan Open Graph (gambar pratinjau saat link dibagikan), `sitemap`, `robots`.
- Halaman **Kebijakan Privasi** dan **Disclaimer** yang jelas dan singkat.
- Halaman **Bagikan**: tautan, QR code, dan poster siap cetak untuk sosialisasi PKM.
- **Umpan balik**: tombol menuju Google Form kepuasan/masukan (pengganti pre-test/post-test sementara, tanpa database). Form dikelola tim, bukan oleh website.
- Analitik ringan yang menjaga privasi (misalnya Vercel Web Analytics) untuk bukti jangkauan PKM: jumlah kunjungan, halaman populer. Tidak boleh melacak individu.

### Fase 7: QA dan serah terima
- Uji di HP nyata (Android dan iOS jika ada), lebar 360, 390, 430 px.
- Audit aksesibilitas dan performa (bagian 8).
- Review konten oleh dosen pembimbing dan cewe developer (keperawatan) sebelum publikasi luas.
- Dokumentasi: `README.md` (cara menambah materi, game, dan mengganti data), `CREDITS.md`.

## 6. Fitur, game, dan konten

### 6.1 Fitur tambahan (rangkuman)
BottomNav, tombol bantuan cepat, Mode Tenang, mode gelap, pencarian materi, favorit, progres dan lencana, Cek Perasaan Harian, Catatan Harian, Pengaturan, PWA, halaman Bagikan (QR/poster), tautan umpan balik, halaman Kebijakan Privasi, halaman 404/error ramah, serta halaman **Bantu Temanmu** (cara mendukung teman yang sedang kesulitan) dan **Kenali Tanda Bahaya** (kapan harus mencari bantuan).

Untuk halaman Bantuan: tambahkan daftar **konseling kampus** (dikelola di `content/bantuan.ts`), info puskesmas, dan nomor Healing119 (Kemenkes). Nomor layanan harus dicek ulang berkala dan diberi tanggal verifikasi.

### 6.2 Daftar game
Semua game: bisa dimainkan satu tangan di HP, tanpa skor yang menghakimi, tanpa data pribadi tersimpan, ada tombol keluar yang jelas, dan ada ringkasan "apa yang kamu latih" setelah selesai.
- Latihan Napas v2: pilihan pola (misalnya 4-4-4-4 dan tarik 4, buang 6), durasi sesi (1/3/5 menit), maskot ikut bernapas, getaran dan suara opsional. Sertakan peringatan berhenti jika pusing.
- Grounding 5-4-3-2-1: pengguna mengetuk daftar hal yang dilihat, disentuh, didengar, dicium, dirasa; animasi lembut tiap tahap.
- Mitos atau Fakta: kartu geser kiri/kanan berisi pernyataan tentang kesehatan mental; jawaban disertai penjelasan singkat dan tautan ke sumber materi terkait.
- Cerita Interaktif: skenario kuliah bercabang (misalnya tugas menumpuk, konflik kelompok) dengan pilihan cara menghadapi; tidak ada pilihan "salah", hanya dampak dan tips koping.
- Gelembung Pikiran: ketik kekhawatiran lalu "lepaskan" sebagai gelembung yang pecah atau terbang. Teks **tidak disimpan** ke mana pun.
- Kartu Memori Coping: pasangkan kartu keterampilan koping dengan penjelasannya.
- Mewarnai Mandala: kanvas mewarnai sederhana yang menenangkan (sentuh untuk mengisi warna), bisa disimpan sebagai gambar.
- Rencana Hari Ini: susun 3 hal kecil untuk hari ini (belajar, istirahat, kegiatan menyenangkan) dengan seret dan lepas.
- Upgrade game lama: Tebak Emosi (lebih banyak skenario dan roda emosi), Kartu Afirmasi (kategori, favorit, kalimat lebih banyak).

### 6.3 Daftar topik materi
Ada: stres akademik, rasa cemas, tidur dan pikiran, burnout, merasa kesepian.
Prioritas tambahan:
1. Mengenal dan menamai emosi
2. Prokrastinasi dan manajemen waktu belajar
3. Perfeksionisme dan imposter syndrome
4. Media sosial, FOMO, dan doomscrolling
5. Berdamai dengan diri sendiri (self-compassion)
6. Komunikasi asertif dan konflik dengan teman atau kelompok
7. Kecemasan sosial dan takut presentasi
8. Mindfulness dan relaksasi
9. Kehilangan dan berduka
10. Kenali tanda bahaya dan kapan mencari bantuan profesional
11. Cara membantu teman yang sedang kesulitan
12. Stres finansial mahasiswa (opsional)

Topik sensitif (bunuh diri, menyakiti diri): hanya boleh ditulis mengikuti panduan *safe messaging* (misalnya dari WHO). Wajib direview dosen pembimbing sebelum tayang. Jangan ditulis agent dari ingatan.

## 7. Standar konten dan sumber (termasuk jurnal)

### 7.1 Prinsip
- Bahasa Indonesia santai tapi akurat, memakai "kamu", hindari istilah klinis tanpa penjelasan, tidak menghakimi.
- Tidak ada klaim diagnosis, tidak ada anjuran obat atau dosis.
- Setiap materi minimal 3 sumber, dan minimal 1 sumber jurnal ilmiah atau lembaga resmi (WHO, Kemenkes RI, NIMH, APA, dsb).
- Tulis ulang dengan kata-kata sendiri. Jangan menyalin paragraf dari sumber.
- Berikan konteks Indonesia bila ada (misalnya data Survei Kesehatan Indonesia atau Kemenkes), dan sebutkan tahun data.

### 7.2 Struktur data materi (perluas `content/materi.ts`)
```ts
type Sumber = {
  label: string;       // judul + lembaga/penulis
  url: string;         // tautan yang sudah diverifikasi
  jenis: "jurnal" | "lembaga" | "artikel" | "buku";
  tahun?: number;
  doi?: string;        // jika ada, harus nyata
  bahasa: "id" | "en";
  diverifikasi: string; // tanggal terakhir link dicek (ISO)
};
```
Tambahkan juga ke tiap materi: `kategori`, `waktuBaca` (menit), `latihan` (langkah praktik singkat), `tingkatSensitif` (`biasa` | `sensitif`), dan `direview` (status review dosen: `belum` | `sudah`).

### 7.3 Cara mencari jurnal
Gunakan sumber yang bisa diperiksa: PubMed, Google Scholar, Garuda (`garuda.kemdikbud.go.id`), portal SINTA, dan situs resmi WHO/Kemenkes.

### 7.4 Verifikasi (wajib)
- Buat skrip `scripts/verify-links.mjs` yang memeriksa semua `url` di `content/*`.
- DOI harus dicocokkan dengan judul dan tahun yang tercatat.
- Update `diverifikasi` setiap kali link dicek.

## 8. Persyaratan non-fungsional

- **Mobile-first**: semua layar nyaman di 360 px; area sentuh minimal 44x44 px; tidak ada scroll horizontal.
- **Performa**: Lighthouse mobile target Performance 90+.
- **Aksesibilitas**: target Lighthouse Accessibility 95+; kontras warna memadai; teks alternatif; navigasi keyboard; label ARIA untuk game; hormati `prefers-reduced-motion`.
- **Privasi**: tidak ada akun, tidak ada pengiriman data pribadi.
- **Keamanan**: tautan eksternal memakai `rel="noopener noreferrer"`; tidak ada skrip pihak ketiga yang tidak perlu.
- **Biaya**: tetap gratis (Vercel Hobby).
- **Kompatibilitas**: Chrome dan Safari mobile terbaru, serta peramban bawaan Android.

## 9. Risiko dan hal yang perlu diputuskan tim

- Review konten oleh dosen pembimbing / tenaga profesional sebelum disebar luas.
- Bukti dampak PKM (Google Form kepuasan + statistik kunjungan).
- Maskot orisinal.
- Kontak konseling kampus dan data tim/nama website (`ISI:`).
- Hindari gamifikasi yang menimbulkan tekanan.
- Keterbatasan layanan gratis Vercel Hobby.

## 10. Definition of Done (berlaku untuk setiap fase)

- `npm run build` dan `npm run lint` lulus tanpa error.
- Semua halaman diuji di lebar 360 px dan tidak ada konten yang rusak atau hilang.
- Animasi mati dengan benar saat Mode Tenang atau `prefers-reduced-motion` aktif.
- Tidak ada aset berhak cipta tanpa lisensi; `CREDITS.md` diperbarui.
- Link sumber baru sudah diverifikasi dan tercatat tanggalnya.
- Perubahan dirangkum singkat: file apa yang berubah dan alasannya.
- Tidak ada teks `ISI:` tersisa pada halaman yang akan dipublikasikan.

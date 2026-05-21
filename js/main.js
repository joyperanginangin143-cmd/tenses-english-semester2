/* ============================================================
   main.js — JavaScript untuk semua halaman website
   
   File ini berisi fungsi-fungsi yang dipakai bersama di
   seluruh halaman website. Letakkan di tag <script> terakhir
   sebelum </body> agar HTML sudah dimuat lebih dulu.
   ============================================================ */

/* ---- FUNGSI: Toggle Menu Navigasi (untuk mobile) ----
   Saat tombol hamburger (☰) diklik, kita tambah/hapus
   kelas "open" pada daftar link navigasi.
   CSS kita sudah atur: kalau ada kelas "open", menu tampil. */
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('open');
}

/* ---- FUNGSI: Tandai link navbar yang aktif ----
   Cek URL halaman saat ini, lalu tambahkan kelas "active"
   ke link yang sesuai agar terlihat berbeda dari link lain. */
function setActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname; // Ambil path URL

  links.forEach(link => {
    // Hapus kelas active dari semua link dulu
    link.classList.remove('active');

    // Kalau href link cocok dengan halaman saat ini, beri active
    if (currentPage.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

/* ---- FUNGSI: Animasi elemen saat muncul di layar ----
   Kita pakai "Intersection Observer" — ini cara modern untuk
   mendeteksi apakah sebuah elemen sudah terlihat di layar.
   Kalau terlihat, kita tambah kelas "visible" sehingga CSS
   bisa membuatnya muncul dengan animasi. */
function initScrollAnimation() {
  // Pilih semua elemen yang punya kelas "animate-on-scroll"
  const elements = document.querySelectorAll('.animate-on-scroll');

  // Buat observer (pengamat)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Kalau elemen masuk ke area tampilan layar, beri kelas visible
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 }); // Mulai animasi saat 15% elemen terlihat

  // Mulai mengamati setiap elemen
  elements.forEach(el => observer.observe(el));
}

/* ---- JALANKAN SEMUA FUNGSI SAAT HALAMAN SIAP ---- */
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initScrollAnimation();
});

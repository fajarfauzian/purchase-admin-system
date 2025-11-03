# Purchase Admin System

Sistem admin untuk mengelola pembelian produk dengan Node.js, Express.js, EJS, dan MySQL.

## Fitur

- ✅ Menambah data pembelian (produk, jumlah, total harga otomatis)
- ✅ Membatalkan pembelian (ubah status menjadi "batal")
- ✅ Melihat daftar produk dan stok
- ✅ Melihat riwayat pembelian

## Teknologi yang Digunakan

- **Backend**: Node.js + Express.js
- **Template Engine**: EJS
- **Database**: MySQL
- **Frontend**: Bootstrap 5 + Custom CSS

## Struktur Database

### Tabel `produk`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `nama` (VARCHAR)
- `harga` (DECIMAL)

### Tabel `stock_produk`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `produk_id` (INT, FOREIGN KEY)
- `stok` (INT)

### Tabel `pembelian`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `produk_id` (INT, FOREIGN KEY)
- `qty` (INT)
- `total` (DECIMAL)
- `status` (ENUM: 'aktif', 'batal')
- `tanggal` (DATETIME)

## Cara Menjalankan Project

### 1. Persiapan Database

Pastikan MySQL sudah terinstall dan berjalan. Buat database baru:

```sql
CREATE DATABASE purchase_system;
```

Lalu jalankan file SQL untuk membuat tabel dan data awal.
Masuk ke MySQL dari terminal, pilih database-nya, lalu jalankan perintah berikut (sesuaikan dengan lokasi folder project kamu):

```bash
SOURCE path_ke_folder_project_kamu/database/init.sql;
```

Atau jalankan file `database/init.sql` melalui MySQL client/phpMyAdmin.

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Database

Edit file `config/database.js` sesuai dengan konfigurasi MySQL Anda:

```javascript
host: 'localhost',
user: 'root',           
password: '',           
database: 'purchase_system'
```

### 4. Jalankan Server

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## Cara Penggunaan

1. **Dashboard**: Akses `http://localhost:3000` untuk melihat ringkasan sistem
2. **Daftar Produk**: Klik menu "Produk & Stok" untuk melihat semua produk dan stok tersedia
3. **Tambah Pembelian**: Klik menu "Tambah Pembelian" untuk membuat transaksi baru
4. **Riwayat Pembelian**: Klik menu "Riwayat Pembelian" untuk melihat semua transaksi
5. **Batalkan Pembelian**: Klik tombol "Batalkan" pada transaksi yang ingin dibatalkan

## Struktur File Utama

- **app.js**: Entry point aplikasi, konfigurasi Express
- **config/database.js**: Konfigurasi koneksi MySQL
- **routes/index.js**: Route untuk halaman utama
- **routes/admin.js**: Route untuk fitur admin (CRUD pembelian)
- **views/**: Template EJS untuk tampilan
- **public/**: Asset statis (CSS, JS, images)
- **database/init.sql**: Script SQL untuk inisialisasi database

## Dependencies

```json
{
  "express": "^4.18.2",
  "ejs": "^3.1.9",
  "mysql2": "^3.6.5",
  "body-parser": "^1.20.2"
}
```

## Catatan

- Database sudah berisi 10 data produk contoh
- Total harga pembelian dihitung otomatis: `qty × harga_produk`
- Status pembelian: "aktif" atau "batal"
- Desain menggunakan Bootstrap 5 dengan custom styling

## Lisensi

MIT License
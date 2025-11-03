const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
  
    const [totalProduk] = await db.query('SELECT COUNT(*) as total FROM produk');
    const [totalStok] = await db.query('SELECT SUM(stok) as total FROM stock_produk');
    const [totalPembelianAktif] = await db.query(
      'SELECT COUNT(*) as total FROM pembelian WHERE status = "aktif"'
    );
    const [totalPembelianBatal] = await db.query(
      'SELECT COUNT(*) as total FROM pembelian WHERE status = "batal"'
    );
    const [totalNilaiPembelian] = await db.query(
      'SELECT SUM(total) as total FROM pembelian WHERE status = "aktif"'
    );

    const [recentPurchases] = await db.query(`
      SELECT pm.id, p.nama as produk, pm.qty, pm.total, pm.status, pm.tanggal
      FROM pembelian pm
      JOIN produk p ON pm.produk_id = p.id
      ORDER BY pm.tanggal DESC
      LIMIT 5
    `);

    res.render('index', {
      stats: {
        totalProduk: totalProduk[0].total,
        totalStok: totalStok[0].total || 0,
        totalPembelianAktif: totalPembelianAktif[0].total,
        totalPembelianBatal: totalPembelianBatal[0].total,
        totalNilaiPembelian: totalNilaiPembelian[0].total || 0
      },
      recentPurchases
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('index', { 
      error: 'Terjadi kesalahan saat memuat dashboard',
      stats: {},
      recentPurchases: []
    });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/products', async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.id, p.nama, p.harga, sp.stok
      FROM produk p
      LEFT JOIN stock_produk sp ON p.id = sp.produk_id
      ORDER BY p.nama
    `);

    res.render('products', { products });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('products', { 
      products: [],
      error: 'Terjadi kesalahan saat memuat data produk'
    });
  }
});

router.get('/add-purchase', async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.id, p.nama, p.harga, sp.stok
      FROM produk p
      LEFT JOIN stock_produk sp ON p.id = sp.produk_id
      ORDER BY p.nama
    `);

    res.render('add-purchase', { products, success: null, error: null });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('add-purchase', { 
      products: [],
      error: 'Terjadi kesalahan saat memuat form'
    });
  }
});

router.post('/add-purchase', async (req, res) => {
  const { produk_id, qty } = req.body;

  try {
  
    if (!produk_id || !qty || qty <= 0) {
      const [products] = await db.query(`
        SELECT p.id, p.nama, p.harga, sp.stok
        FROM produk p
        LEFT JOIN stock_produk sp ON p.id = sp.produk_id
        ORDER BY p.nama
      `);
      return res.render('add-purchase', { 
        products,
        error: 'Data tidak valid. Pastikan produk dan jumlah sudah dipilih.',
        success: null
      });
    }

    const [product] = await db.query(
      'SELECT harga FROM produk WHERE id = ?',
      [produk_id]
    );

    if (product.length === 0) {
      const [products] = await db.query(`
        SELECT p.id, p.nama, p.harga, sp.stok
        FROM produk p
        LEFT JOIN stock_produk sp ON p.id = sp.produk_id
        ORDER BY p.nama
      `);
      return res.render('add-purchase', { 
        products,
        error: 'Produk tidak ditemukan',
        success: null
      });
    }

    const total = product[0].harga * qty;

    await db.query(
      'INSERT INTO pembelian (produk_id, qty, total, status) VALUES (?, ?, ?, "aktif")',
      [produk_id, qty, total]
    );

    res.redirect('/admin/purchases?success=add');
  } catch (error) {
    console.error('Error:', error);
    const [products] = await db.query(`
      SELECT p.id, p.nama, p.harga, sp.stok
      FROM produk p
      LEFT JOIN stock_produk sp ON p.id = sp.produk_id
      ORDER BY p.nama
    `);
    res.render('add-purchase', { 
      products,
      error: 'Terjadi kesalahan saat menyimpan data pembelian',
      success: null
    });
  }
});

router.get('/purchases', async (req, res) => {
  try {
    const [purchases] = await db.query(`
      SELECT pm.id, p.nama as produk, pm.qty, pm.total, pm.status, pm.tanggal
      FROM pembelian pm
      JOIN produk p ON pm.produk_id = p.id
      ORDER BY pm.tanggal DESC
    `);

    const success = req.query.success === 'add' ? 'Pembelian berhasil ditambahkan!' :
                    req.query.success === 'cancel' ? 'Pembelian berhasil dibatalkan!' : null;

    res.render('purchases', { purchases, success, error: null });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('purchases', { 
      purchases: [],
      error: 'Terjadi kesalahan saat memuat data pembelian',
      success: null
    });
  }
});

router.post('/cancel-purchase/:id', async (req, res) => {
  const { id } = req.params;

  try {
    
    const [result] = await db.query(
      'UPDATE pembelian SET status = "batal" WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.redirect('/admin/purchases?error=notfound');
    }

    res.redirect('/admin/purchases?success=cancel');
  } catch (error) {
    console.error('Error:', error);
    res.redirect('/admin/purchases?error=cancel');
  }
});

module.exports = router;

DROP TABLE IF EXISTS pembelian;
DROP TABLE IF EXISTS stock_produk;
DROP TABLE IF EXISTS produk;

CREATE TABLE produk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock_produk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produk_id INT NOT NULL,
    stok INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (produk_id) REFERENCES produk(id) ON DELETE CASCADE
);

CREATE TABLE pembelian (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produk_id INT NOT NULL,
    qty INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('aktif', 'batal') DEFAULT 'aktif',
    tanggal DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produk_id) REFERENCES produk(id) ON DELETE CASCADE
);

INSERT INTO produk (nama, harga) VALUES
('Laptop ASUS ROG', 15000000.00),
('Mouse Logitech MX Master', 1200000.00),
('Keyboard Mechanical RGB', 850000.00),
('Monitor LG 27 Inch', 3500000.00),
('Headset Gaming HyperX', 1500000.00),
('Webcam Logitech C920', 1100000.00),
('SSD Samsung 1TB', 1800000.00),
('RAM Corsair 16GB', 900000.00),
('Cooler CPU Noctua', 650000.00),
('Mousepad Extended RGB', 350000.00);

INSERT INTO stock_produk (produk_id, stok) VALUES
(1, 15),
(2, 45),
(3, 30),
(4, 20),
(5, 35),
(6, 25),
(7, 40),
(8, 50),
(9, 28),
(10, 60);

INSERT INTO pembelian (produk_id, qty, total, status, tanggal) VALUES
(1, 2, 30000000.00, 'aktif', '2025-11-01 10:30:00'),
(2, 5, 6000000.00, 'aktif', '2025-11-01 11:15:00'),
(3, 3, 2550000.00, 'aktif', '2025-11-02 09:20:00'),
(4, 1, 3500000.00, 'batal', '2025-11-02 14:45:00'),
(5, 4, 6000000.00, 'aktif', '2025-11-03 08:10:00');

SELECT 'Produk:' as Info;
SELECT * FROM produk;

SELECT 'Stock Produk:' as Info;
SELECT p.nama, sp.stok 
FROM stock_produk sp 
JOIN produk p ON sp.produk_id = p.id;

SELECT 'Pembelian:' as Info;
SELECT pm.id, p.nama as produk, pm.qty, pm.total, pm.status, pm.tanggal 
FROM pembelian pm 
JOIN produk p ON pm.produk_id = p.id;
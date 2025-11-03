const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.use((req, res) => {
  res.status(404).render('index', { 
    error: 'Halaman tidak ditemukan' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
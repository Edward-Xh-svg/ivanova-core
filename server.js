const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// إعداد المجلد العام - ملفات CSS/JS/Images ستكون في مجلد public
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// =================================================================
// 🚦 خريطة الطرق المحدثة (Clean URLs Protocol)
// =================================================================

// 1. البوابة الرئيسية (تفتح Login تلقائياً)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

// 2. نظام القائمة الجديد (الذي طلبته)
app.get('/menu', (req, res) => res.sendFile(path.join(__dirname, 'public', 'menu.html')));

// 3. روابط نظيفة للمشاريع القديمة (بدون .html)
app.get('/world', (req, res) => res.sendFile(path.join(__dirname, 'public', 'ivanovaworld.html')));
app.get('/space', (req, res) => res.sendFile(path.join(__dirname, 'public', 'space.html')));
app.get('/ivavers', (req, res) => res.sendFile(path.join(__dirname, 'public', 'ivavers.html')));

// 4. ✅ دعم Comio و M-Comio بروابط نظيفة وديناميكية
app.get('/comio*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'comio.html')));
app.get('/mcomio*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'mcomio.html')));

// 5. روابط الطوارئ (لدعم الملفات القديمة إذا طلبها المتصفح بـ .html)
app.get('/login.html', (req, res) => res.redirect('/'));
app.get('/menu.html', (req, res) => res.redirect('/menu'));

// =================================================================

// أي رابط غير معروف -> إعادة توجيه للبوابة الرئيسية (Security Layer)
app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`--- IVANOVA SYSTEM ONLINE ---`);
    console.log(`Core: http://localhost:${PORT}`);
    console.log(`Status: Stable & Sovereign`);
});

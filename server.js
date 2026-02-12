const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// إعداد المجلد العام للملفات الثابتة (CSS, Images, JS)
// نلغي الـ index الافتراضي لنتحكم نحن في التوجيه
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// 1. الرابط الرئيسي (ivanova.sbs) يفتح صفحة الدخول
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 2. رابط النظام (ivanova.sbs/app) يفتح الصفحة الرئيسية القديمة
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// التعامل مع أي رابط آخر بتوجيهه لصفحة الدخول (للحماية)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

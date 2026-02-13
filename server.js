const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// إعداد المجلد العام
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// =================================================================
// 🚦 خريطة الطرق (Routing Map)
// =================================================================

// 1. الصفحة الرئيسية (ivanova.sbs) -> تذهب للدخول
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 2. صفحة البوابة (The Gateway)
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. صفحة الدخول (صراحة)
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 4. ✅ (الجديد) نظام التشغيل - Ivanova World
app.get('/ivanovaworld.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ivanovaworld.html'));
});

// 5. ✅ (مستقبلاً) Space
app.get('/space.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'space.html'));
});

// 6. ✅ (مستقبلاً) Comio
app.get('/comio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'comio.html'));
});

// =================================================================

// أي رابط غير معروف -> ارسله للدخول (للحماية)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, () => {
    console.log(`System Online: http://localhost:${PORT}`);
});

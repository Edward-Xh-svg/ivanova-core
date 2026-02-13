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

// 3. صفحة الدخول
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 4. نظام التشغيل - Ivanova World
app.get('/ivanovaworld.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ivanovaworld.html'));
});

// 5. المستودع السحابي - Space
app.get('/space.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'space.html'));
});

// 6. منصة التواصل - Comio
app.get('/comio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'comio.html'));
});

// 7. ✅ (الجديد) مركز الرسائل المشفرة - M-Comio
app.get('/mcomio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mcomio.html'));
});

// 8. ✅ (الجديد) مركز الخدمات والهوية - Ivavers
app.get('/ivavers.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ivavers.html'));
});

// =================================================================

// أي رابط غير معروف -> ارسله للدخول (للحماية)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, () => {
    console.log(`System Online: http://localhost:${PORT}`);
});

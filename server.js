const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// إعداد المجلد العام
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// =================================================================
// 🚦 خريطة الطرق (Routing Map) المحدثة
// =================================================================

// 1. البوابات الأساسية
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

// 2. نظام التشغيل المركزي - Ivanova World
app.get('/ivanovaworld.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'ivanovaworld.html')));

// 3. المستودع السحابي - Space
app.get('/space.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'space.html')));

// 4. ✅ دعم الروابط الديناميكية لـ Comio (Profiles / Search)
// نستخدم النجمة (*) للسماح بالمسارات الفرعية مثل /comio.html/profile
app.get('/comio.html*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'comio.html'));
});

// 5. ✅ دعم الروابط الديناميكية لـ M-Comio (Private/Group Messages)
// يسمح بفتح المسارات العميقة مثل /mcomio.html/iosin/mes?=...
app.get('/mcomio.html*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mcomio.html'));
});

// 6. مركز الخدمات والهوية - Ivavers
app.get('/ivavers.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'ivavers.html')));

// =================================================================

// أي رابط غير معروف -> ارسله للدخول (للحماية)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, () => {
    console.log(`System Online: http://localhost:${PORT}`);
});

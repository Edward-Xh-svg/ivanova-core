const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// توجيه الصفحة الرئيسية إلى index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/mathPDF', express.static(path.join(__dirname, 'public/mathPDF')));
app.use('/physicPDF', express.static(path.join(__dirname, 'public/physicPDF')));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

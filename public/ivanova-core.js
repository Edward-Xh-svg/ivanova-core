// public/ivanova-core.js
const IvanovaCore = {
    // 1. توليد IDCHAT الـ 21 رمزاً
    generateIDCHAT: () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456489';
        let result = '';
        for (let i = 0; i < 21; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    // 2. قراءة الروابط الديناميكية (مثل IDUSER)
    getParams: () => {
        const url = window.location.href;
        const params = {};
        if (url.includes('profile?=')) params.profileID = url.split('profile?=')[1].replace('/', '');
        if (url.includes('mes?=')) params.mesID = url.split('mes?=')[1].replace('/', '');
        if (url.includes('grmes?=')) params.groupID = url.split('grmes?=')[1].replace('/', '');
        return params;
    }
};

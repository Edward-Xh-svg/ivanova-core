// أضف هذا الجزء داخل دالة السكريبت الموجودة أو في نهايتها
async function checkSession() {
    const { data } = await _supabase.auth.getSession();
    if (data.session) {
        // إذا كان المستخدم مسجلاً، انقله فوراً للوحة التحكم
        window.location.href = '/index.html';
    }
}
// شغل الفحص بمجرد فتح الصفحة
window.onload = checkSession;

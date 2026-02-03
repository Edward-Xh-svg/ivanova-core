/* =========================================
   IVANOVA SYSTEM CORE LOGIC
   ========================================= */

// 1. إعدادات الاتصال بـ Supabase
const supabaseUrl = 'https://yubvsehgmnudhcqwajae.supabase.co';
const supabaseKey = 'sb_publishable_jx6I4sjazjPPYFYldG_ZtA_MQc172DC';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// متغير لتخزين بيانات المستخدم الحالي
let currentUser = null;

// =========================================
// 2. عند تشغيل الموقع (Initialization)
// =========================================
window.onload = async () => {
    console.log("System Initializing...");
    
    try {
        // التحقق فوراً: هل المستخدم مسجل دخول؟
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
            console.log("Session found. Loading Operative profile...");
            await handleUserLogin(session.user);
        } else {
            // إذا لم يكن مسجلاً، اعرض صفحة البداية
            switchView('landing');
        }
    } catch (err) {
        console.error("Init Error:", err);
        // في حال حدوث خطأ، نعود لصفحة الهبوط للأمان
        switchView('landing');
    }
};

// =========================================
// 3. وظائف المصادقة (Auth Functions)
// =========================================

// تسجيل الدخول بجوجل
async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // العودة لنفس الصفحة الحالية بعد الدخول
            redirectTo: window.location.href,
            queryParams: { access_type: 'offline', prompt: 'consent' }
        }
    });
    
    if (error) {
        alert("SECURITY ALERT: Login Failed - " + error.message);
    }
}

// معالجة بيانات المستخدم بعد الدخول
async function handleUserLogin(user) {
    try {
        // 1. البحث عن الملف الشخصي في قاعدة البيانات
        let { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        // 2. إذا كان مستخدماً جديداً (ليس لديه ملف)، ننشئ له واحداً
        if (!profile) {
            const newName = generateName();
            console.log(`New recruit detected. Assigning callsign: ${newName}`);
            
            const { data } = await supabase
                .from('profiles')
                .insert([{
                    id: user.id, 
                    username: newName, 
                    avatar_url: user.user_metadata.avatar_url
                }])
                .select()
                .single();
                
            profile = data;
        }

        // 3. حفظ البيانات وتحديث الواجهة
        currentUser = profile;
        updateUI(true);
        switchView('rooms'); // توجيه مباشر لغرفة العمليات

    } catch (err) {
        console.error("Profile Error:", err);
        alert("System Malfunction: Could not load profile.");
    }
}

// تسجيل الخروج
async function signOut() {
    await supabase.auth.signOut();
    window.location.reload(); // إعادة تحميل الصفحة لتنظيف الذاكرة
}

// =========================================
// 4. أدوات مساعدة (Utilities)
// =========================================

// مولد الأسماء العسكرية العشوائية
function generateName() {
    const adjectives = ['Guardian', 'Silent', 'Iron', 'Neon', 'Cyber', 'Rogue', 'Shadow', 'Crimson'];
    const nouns = ['Star', 'Viper', 'Ghost', 'Titan', 'Reaper', 'Storm', 'Specter', 'Wolf'];
    
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const num = Math.floor(Math.random() * 9000) + 1000;
    
    return `${rand(adjectives)}${rand(nouns)}${num}`;
}

// =========================================
// 5. إدارة الواجهة (UI Management)
// =========================================

// تحديث العناصر بناءً على حالة التسجيل
function updateUI(isLoggedIn) {
    const navLinks = document.getElementById('nav-links');
    const userDisplay = document.getElementById('user-display');
    const authBtn = document.getElementById('main-auth-btn');
    const usernameText = document.getElementById('username-text');

    if (isLoggedIn && currentUser) {
        // إظهار القوائم
        if(navLinks) navLinks.classList.remove('hidden');
        if(navLinks) navLinks.classList.add('flex');
        
        // إظهار اسم المستخدم
        if(userDisplay) userDisplay.classList.remove('hidden');
        if(usernameText) usernameText.innerText = currentUser.username.toUpperCase();
        
        // تغيير زر الدخول إلى زر "إجهاض/خروج"
        if(authBtn) {
            authBtn.innerText = "ABORT";
            authBtn.classList.add('border-red-500', 'text-red-500', 'hover:bg-red-500');
            authBtn.classList.remove('text-brand-accent');
            authBtn.onclick = signOut; // ربط الزر بدالة الخروج
        }
    }
}

// التنقل بين الصفحات (SPA Router)
function switchView(viewName) {
    // حماية: منع الوصول للصفحات الداخلية إذا لم يكن مسجلاً
    if (!currentUser && viewName !== 'landing') {
        // إذا حاول الوصول للغرف وهو غير مسجل، لا تفعل شيئاً (أو أعده للهبوط)
        return;
    }

    // 1. إخفاء كل الصفحات
    ['view-landing', 'view-rooms', 'view-space'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.classList.add('hidden');
    });

    // 2. إظهار الصفحة المطلوبة
    const target = document.getElementById(`view-${viewName}`);
    if(target) {
        target.classList.remove('hidden');
    }
}

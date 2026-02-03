// 1. الاتصال بـ Supabase
const supabaseUrl = 'https://yubvsehgmnudhcqwajae.supabase.co';
const supabaseKey = 'sb_publishable_jx6I4sjazjPPYFYldG_ZtA_MQc172DC';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// كائن إدارة النظام
const app = {
    currentUser: null,

    // عند بدء التشغيل
    init: async () => {
        console.log("System Initializing...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
            await app.handleLogin(session.user);
        } else {
            app.navigate('landing');
        }
    },

    // تسجيل الدخول
    login: async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.href,
                queryParams: { access_type: 'offline', prompt: 'consent' }
            }
        });
        if (error) alert("Login Error: " + error.message);
    },

    // معالجة المستخدم
    handleLogin: async (user) => {
        // التحقق من الملف الشخصي أو إنشاؤه
        let { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        
        if (!profile) {
            // مستخدم جديد = اسم جديد
            const newName = app.generateCodename();
            const { data } = await supabase.from('profiles').insert([{
                id: user.id,
                username: newName,
                avatar_url: user.user_metadata.avatar_url
            }]).select().single();
            profile = data;
        }

        app.currentUser = profile;
        app.updateUI(true);
        app.navigate('rooms');
    },

    // الخروج
    logout: async () => {
        await supabase.auth.signOut();
        window.location.reload();
    },

    // التنقل بين الصفحات
    navigate: (viewId) => {
        // حماية: لا يمكن دخول الغرف بدون تسجيل
        if (!app.currentUser && viewId !== 'landing') return;

        // إخفاء الكل
        document.querySelectorAll('section').forEach(el => el.classList.add('hidden-view'));
        
        // إظهار المطلوب
        const target = document.getElementById(`view-${viewId}`);
        if (target) target.classList.remove('hidden-view');
    },

    // تحديث الواجهة
    updateUI: (isLoggedIn) => {
        if (isLoggedIn) {
            document.getElementById('nav-menu').classList.remove('hidden');
            document.getElementById('nav-menu').classList.add('flex');
            
            document.getElementById('user-info').classList.remove('hidden');
            document.getElementById('username-display').innerText = app.currentUser.username;
            
            const btn = document.getElementById('auth-btn');
            btn.innerText = "خروج";
            btn.classList.replace('text-brand', 'text-red-500');
            btn.classList.replace('border-brand', 'border-red-500');
            btn.onclick = app.logout;
        }
    },

    // أدوات مساعدة
    generateCodename: () => {
        const ranks = ['Operative', 'Commander', 'Agent', 'Scout'];
        const codes = Math.floor(Math.random() * 9000) + 1000;
        return `${ranks[Math.floor(Math.random()*ranks.length)]}-${codes}`;
    },

    // وظائف الأزرار (تفاعلية فقط حالياً)
    createRoom: () => {
        const name = prompt("أدخل اسم الغرفة الجديدة:");
        if(name) alert(`سيتم إنشاء الغرفة "${name}" وربطها بقاعدة البيانات قريباً.`);
    },

    uploadApp: () => {
        alert("فتح بوابة الرفع الآمن... (قيد التطوير)");
    }
};

window.onload = app.init;

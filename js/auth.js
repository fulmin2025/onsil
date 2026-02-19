
/**
 * Supabase Authentication Logic
 */

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';

// Initialize Supabase Client
let supabase;

console.log('Auth.js loading...');

function getSupabase() {
    if (supabase) return supabase;

    if (window.supabase) {
        console.log('Supabase initialized in getSupabase');
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        return supabase;
    }

    console.error('Supabase SDK not loaded in getSupabase');
    return null;
}

// Retry initialization if needed
document.addEventListener('DOMContentLoaded', () => {
    if (!getSupabase() && window.supabase) {
        getSupabase();
    }
});

const Auth = {
    /**
     * Signup a new user
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     */
    signup: async (email, password, name) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('시스템 오류: 서버 연결에 실패했습니다. (SDK 로드 실패)');

            const { data, error } = await client.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name
                    }
                }
            });

            if (error) throw error;

            return { success: true, message: '회원가입이 완료되었습니다. 로그인해주세요.' };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, message: error.message || '회원가입 실패' };
        }
    },

    /**
     * Login a user
     * @param {string} email 
     * @param {string} password 
     */
    login: async (email, password) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('시스템 오류: 서버 연결에 실패했습니다.');

            const { data, error } = await client.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            return { success: true, message: '로그인되었습니다.' };
        } catch (error) {
            console.error('Login error:', error);
            // Translate common errors
            let msg = error.message;
            if (msg === 'Invalid login credentials') msg = '이메일 또는 비밀번호가 올바르지 않습니다.';
            return { success: false, message: msg };
        }
    },

    /**
     * Logout
     */
    logout: async () => {
        try {
            const client = getSupabase();
            if (!client) return;

            const { error } = await client.auth.signOut();
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    /**
     * Get Current Session User
     */
    getCurrentUser: async () => {
        const client = getSupabase();
        if (!client) return null;

        const { data: { session } } = await client.auth.getSession();
        if (session && session.user) {
            return {
                email: session.user.email,
                name: session.user.user_metadata.name || session.user.email.split('@')[0]
            };
        }
        return null;
    },

    /**
     * Update Header UI based on Auth State
     */
    updateHeaderUI: async () => {
        const authContainer = document.getElementById('auth-container');
        if (!authContainer) return;

        const user = await Auth.getCurrentUser();

        if (user) {
            // Logged In
            authContainer.innerHTML = `
                <div class="relative group">
                    <button class="flex items-center gap-2 text-gray-700 hover:text-[#1B2B48] font-medium transition-colors">
                        <i class="fas fa-user-circle text-xl"></i>
                        <span>${user.name}님</span>
                    </button>
                    <div class="absolute right-0 top-full pt-2 hidden group-hover:block w-48 z-50">
                        <div class="bg-white rounded-lg shadow-lg border p-2 flex flex-col gap-1">
                            <button onclick="Auth.logout()" class="w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-red-500 text-sm">
                                <i class="fas fa-sign-out-alt mr-2"></i> 로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Logged Out
            authContainer.innerHTML = `
                <a href="login.html" class="text-sm font-medium text-gray-600 hover:text-[#1B2B48] px-4 py-2">
                    로그인
                </a>
                <a href="signup.html" class="bg-[#1B2B48] text-white hover:bg-[#1B2B48]/90 px-4 py-2 rounded-md text-sm font-bold transition-colors shadow-md">
                    회원가입
                </a>
            `;
        }
    }
};

// Make Auth globally available
window.Auth = Auth;
console.log('Auth module assigned to window.Auth');

// Initialize UI on load
document.addEventListener('DOMContentLoaded', () => {
    Auth.updateHeaderUI();

    // Listen for auth state changes
    // Retry getting supabase if it wasn't ready immediately
    setTimeout(() => {
        const client = getSupabase();
        if (client) {
            client.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                    Auth.updateHeaderUI();
                }
            });
        }
    }, 500);
});

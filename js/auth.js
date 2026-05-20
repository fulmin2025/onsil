
/**
 * Supabase Authentication Logic
 */

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';

// PortOne Configuration (Danal Identity Verification V2)
const PORTONE_STORE_ID = "store-da73189c-c561-4ce0-8354-3de92abc40b9";
const PORTONE_CHANNEL_KEY = "channel-key-c871e7bc-cc63-4daf-a74f-2b8b80a9d29c";
const PORTONE_KAKAOPAY_CHANNEL_KEY = "channel-key-14da73a7-37be-4b12-a4e0-dddc0c7ae460";
const PORTONE_CARD_STORE_ID = "store-da73189c-c561-4ce0-8354-3de92abc40b9";
const PORTONE_CARD_CHANNEL_KEY = "channel-key-f5a9e74f-4ef2-4fe0-89e8-8e85e65246b4";

// Initialize Supabase Client
let _supabaseInstance = null;

console.log('Auth.js loading...');

function getSupabase() {
    if (_supabaseInstance) return _supabaseInstance;

    if (typeof supabase === 'undefined' || !supabase.createClient) {
        console.error('Supabase SDK not loaded or invalid');
        return null;
    }

    try {
        _supabaseInstance = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
            db: {
                schema: 'public'
            },
            auth: {
                persistSession: true,
                autoRefreshToken: true
            }
        });
        console.log('Supabase client created successfully.');
        return _supabaseInstance;
    } catch (e) {
        console.error('Failed to create Supabase client:', e);
        return null;
    }
}

const Auth = {
    getSupabase: getSupabase, // Supabase 클라이언트 노출
    PORTONE_STORE_ID: PORTONE_STORE_ID,
    PORTONE_CHANNEL_KEY: PORTONE_CHANNEL_KEY,
    PORTONE_KAKAOPAY_CHANNEL_KEY: PORTONE_KAKAOPAY_CHANNEL_KEY,
    PORTONE_CARD_STORE_ID: PORTONE_CARD_STORE_ID,
    PORTONE_CARD_CHANNEL_KEY: PORTONE_CARD_CHANNEL_KEY,

    /**
     * Signup a new user and create a profile
     */
    signup: async (email, password, name, gender, birthYear, phone, location, marketingAgree) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            // 1. Sign up user via Supabase Auth
            const { data: authData, error: authError } = await client.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        display_name: name,
                        phone: phone,
                    }
                }
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error('회원가입 중 오류가 발생했습니다.');

            // 2. Insert profile metadata into 'profiles' table
            const { error: profileError } = await client
                .from('profiles')
                .upsert({
                    id: authData.user.id,
                    email: email,
                    name: name,
                    phone: phone,
                    gender: gender,
                    birth_year: birthYear,
                    location: location,
                    marketing_agree: marketingAgree
                });

            if (profileError) {
                console.error('Profile creation error:', profileError);
            }

            return { success: true, user: authData.user };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Signup a new partner
     */
    signupPartner: async (email, password, name, facility, phone, marketingAgree) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            const { data: authData, error: authError } = await client.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        display_name: name,
                        phone: phone,
                    }
                }
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error('회원가입 중 오류가 발생했습니다.');

            const { error: profileError } = await client
                .from('profiles')
                .upsert({
                    id: authData.user.id,
                    email: email,
                    name: name,
                    phone: phone,
                    facility: facility,
                    role: 'pending_partner',
                    marketing_agree: marketingAgree
                });

            if (profileError) throw profileError;

            return { success: true, user: authData.user };
        } catch (error) {
            console.error('Signup Partner error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Get Pending Partners
     */
    getPendingPartners: async () => {
        try {
            const client = getSupabase();
            if (!client) return [];

            const { data, error } = await client
                .from('profiles')
                .select('*')
                .eq('role', 'pending_partner')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('getPendingPartners error:', error);
            return [];
        }
    },

    /**
     * Approve Partner
     */
    approvePartner: async (userId) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            const { error } = await client
                .from('profiles')
                .update({ role: 'partner' })
                .eq('id', userId);

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('approvePartner error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Login existing user
     */
    login: async (email, password) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            const { data, error } = await client.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Logout current user
     */
    logout: async () => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            const { error } = await client.auth.signOut();
            if (error) throw error;
            
            location.href = 'index.html';
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Get current logged-in user and profile
     */
    getCurrentUser: async () => {
        try {
            console.log('Auth.getCurrentUser: Attempting to fetch session...');
            const client = getSupabase();
            if (!client) {
                console.error('Auth.getCurrentUser: Supabase client is NULL');
                return null;
            }

            const { data, error } = await client.auth.getUser();
            
            if (error) {
                console.warn('Auth.getCurrentUser: getUser error:', error.message);
                return null;
            }
            
            const user = data?.user;
            if (!user) {
                console.log('Auth.getCurrentUser: No user in session.');
                return null;
            }

            console.log('Auth.getCurrentUser: User identified:', user.email);

            let profile = null;
            try {
                const { data: profileData, error: profileError } = await client
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .maybeSingle();
                if (!profileError) profile = profileData;
            } catch (e) {
                console.warn('Auth.getCurrentUser: Profile fetch failed:', e);
            }

            const mergedUser = { ...user, ...(profile || {}) };
            const adminHashes = [
                '5c8f37e4517561514ddb8e4010b1e4600c4542fe52f765afe9494c059b8891aa', // f
                '615f33115880753a66c25776ee15f93590c9aedc679476a7f33b8262c03140f4', // t
                'e8102f9dd1f1ac3f859a20cb32f24d5d82ea25696c387e5ae1183fe52f7e1580', // a1
                'ecc27b56cc2176da2065922a20a8676beab3150819f344d35f42247389d93b88', // t2
                '3f7bf82339670170dbeff1e3f2b26b81036005c157e56da3962876109df52696'  // a2
            ];
            if (user.email) {
                try {
                    const msgUint8 = new TextEncoder().encode(user.email.toLowerCase().trim());
                    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const emailHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    if (adminHashes.includes(emailHash)) {
                        mergedUser.role = 'admin';
                    }
                } catch (e) {
                    console.error('Hash calculation error:', e);
                }
            }
            return mergedUser;
        } catch (error) {
            console.error('Auth.getCurrentUser: CRITICAL ERROR:', error);
            return null;
        }
    },

    /**
     * Sync user profile to Supabase 'profiles' table
     */
    syncProfile: async (user) => {
        if (!user) return;
        try {
            const client = getSupabase();
            if (!client) return;

            const { error } = await client
                .from('profiles')
                .upsert({
                    id: user.id,
                    email: user.email,
                    name: user.user_metadata?.full_name || user.user_metadata?.name || '',
                    phone: user.user_metadata?.phone || ''
                }, { onConflict: 'id' });

            if (error) console.error('Profile sync error:', error);
        } catch (err) {
            console.error('syncProfile error:', err);
        }
    },

    /**
     * Update Header UI based on Auth state
     */
    updateHeaderUI: async () => {
        const user = await Auth.getCurrentUser();
        const authContainer = document.getElementById('auth-container');
        if (!authContainer) return;

        if (user) {
            const displayName = user.name || user.user_metadata?.full_name || user.email.split('@')[0];
            const isAdmin = user.role === 'admin';
            
            const adminBadge = isAdmin ? `<span class="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[10px] font-black ml-1 uppercase">Admin</span>` : '';
            const adminMenu = isAdmin ? `
                <a href="admin_reservations.html" class="flex items-center gap-3 px-4 py-3 text-sm text-blue-600 font-bold hover:bg-blue-50 rounded-t-xl transition-colors">
                    <i class="fas fa-calendar-alt w-4"></i> 예약 통합 관리
                </a>
                <a href="admin_partners.html" class="flex items-center gap-3 px-4 py-3 text-sm text-blue-600 font-bold hover:bg-blue-50 transition-colors">
                    <i class="fas fa-store w-4"></i> 입점 승인 관리
                </a>
                <a href="admin_funeral_homes.html" class="flex items-center gap-3 px-4 py-3 text-sm text-blue-600 font-bold hover:bg-blue-50 transition-colors">
                    <i class="fas fa-h-square w-4"></i> 장례식장 관리
                </a>
                <div class="h-px bg-gray-100 my-1"></div>
            ` : '';

            authContainer.innerHTML = `
                <div class="relative group">
                    <button class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-all font-medium text-gray-700">
                        <i class="fas fa-user-circle text-lg text-[#1B2B48]"></i>
                        <span class="text-xs"><span class="font-bold text-[#1B2B48]">${displayName}</span>님${adminBadge}</span>
                        <i class="fas fa-chevron-down text-[8px] ml-0.5 opacity-50"></i>
                    </button>
                    <div class="absolute right-0 top-full pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50">
                        <div class="bg-white border border-gray-100 rounded-2xl shadow-xl p-2 space-y-1">
                            ${adminMenu}
                            <a href="mypage.html" class="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                                <i class="fas fa-id-card w-4"></i> 마이페이지
                            </a>
                            <button onclick="Auth.logout()" class="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors border-t border-gray-50 mt-1">
                                <i class="fas fa-sign-out-alt w-4"></i> 로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <div class="flex items-center gap-3">
                    <a href="login.html" class="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-[#1B2B48] transition-colors">로그인</a>
                    <a href="signup.html" class="px-6 py-2.5 bg-[#1B2B48] text-white rounded-full text-sm font-bold hover:bg-[#2a4269] shadow-md hover:shadow-lg transition-all">회원가입</a>
                </div>
            `;
        }
    },

    /**
     * Send Password Reset Email
     */
    sendPasswordReset: async (email) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            const { error } = await client.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/reset-password.html'
            });

            if (error) throw error;
            return { success: true, message: '이메일로 비밀번호 재설정 링크가 발송되었습니다.' };
        } catch (error) {
            console.error('sendPasswordReset error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Update Password
     */
    updateNewPassword: async (newPassword) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            const { error } = await client.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;
            return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.' };
        } catch (error) {
            console.error('updateNewPassword error:', error);
            return { success: false, message: '링크가 만료되었거나 올바르지 않습니다.' };
        }
    },

    /**
     * Request PortOne Identity Verification (V2)
     */
    requestIdentityVerification: async (customerData = {}) => {
        try {
            if (typeof PortOne === 'undefined') {
                throw new Error('PortOne SDK가 로드되지 않았습니다.');
            }

            const getUUID = () => {
                if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };

            const verificationId = `cert-${getUUID()}`;
            const response = await PortOne.requestIdentityVerification({
                storeId: PORTONE_STORE_ID,
                channelKey: PORTONE_CHANNEL_KEY,
                identityVerificationId: verificationId,
                customer: customerData
            });

            if (response.code !== undefined) {
                throw new Error(response.message || '본인인증을 취소하셨거나 실패했습니다.');
            }

            return { 
                success: true, 
                verificationId: response.identityVerificationId || verificationId,
                txId: response.txId
            };
        } catch (error) {
            console.error('Identity Verification Error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Get Supabase Client (Helper)
     */
    getSupabase: () => {
        return getSupabase();
    },

    /**
     * Funeral Home Data Helpers
     */
    getAllFuneralHomes: async () => {
        try {
            console.log('Auth.getAllFuneralHomes: Starting fetch...');
            const client = getSupabase();
            if (!client) {
                console.error('Auth.getAllFuneralHomes: Client not found');
                return [];
            }

            console.log('Auth.getAllFuneralHomes: Sending query to public.funeral_homes...');
            let { data, error } = await client
                .from('funeral_homes')
                .select('*')
                .order('is_alliance', { ascending: false })
                .order('name', { ascending: true });
            
            if (error) {
                console.error('Auth.getAllFuneralHomes: Query Error:', error.message);
                throw error;
            }

            console.log('Auth.getAllFuneralHomes: Fetch complete. Count:', data ? data.length : 0);
            
            // Filter out deleted funeral homes
            let filteredData = data || [];
            if (filteredData && filteredData.length > 0) {
                const hiddenNames = ['펫메모리얼', '펫포유', '파트라슈'];
                filteredData = filteredData.filter(item => !hiddenNames.includes(item.name));
            }

            return filteredData;
        } catch (error) {
            console.error('Auth.getAllFuneralHomes: EXCEPTION:', error);
            return [];
        }
    },

    getFuneralHomeById: async (id) => {
        try {
            const client = getSupabase();
            if (!client) return null;
            
            let query = client.from('funeral_homes').select('*');
            const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
            
            if (isUUID) {
                const { data, error } = await query.or(`id.eq.${id},external_uuid.eq.${id}`).maybeSingle();
                if (error) throw error;
                return data;
            } else {
                const { data, error } = await query.eq('id', id).maybeSingle();
                if (error) throw error;
                return data;
            }
        } catch (error) {
            console.error('getFuneralHomeById error:', error);
            return null;
        }
    },

    updateFuneralHome: async (id, updateData) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('클라이언트 연결 실패');
            const { data, error } = await client
                .from('funeral_homes')
                .update(updateData)
                .eq('id', id)
                .select();
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('updateFuneralHome error:', error);
            return { success: false, message: error.message };
        }
    },

    createFuneralHome: async (formData) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('클라이언트 연결 실패');
            const { data, error } = await client
                .from('funeral_homes')
                .insert([formData])
                .select();
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('createFuneralHome error:', error);
            return { success: false, message: error.message };
        }
    },

    deleteFuneralHome: async (id) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('클라이언트 연결 실패');
            const { error } = await client
                .from('funeral_homes')
                .delete()
                .eq('id', id);
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('deleteFuneralHome error:', error);
            return { success: false, message: error.message };
        }
    },

    getAllFuneralHomes: async () => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('클라이언트 연결 실패');
            const { data, error } = await client
                .from('funeral_homes')
                .select('id, name')
                .order('name', { ascending: true });
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('getAllFuneralHomes error:', error);
            return [];
        }
    }
};

// Make Auth globally available
window.Auth = Auth;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    Auth.updateHeaderUI();

    setTimeout(async () => {
        const client = getSupabase();
        if (client) {
            const { data: { user } } = await client.auth.getUser();
            if (user) {
                Auth.syncProfile(user);
            }

            client.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
                    if (session?.user) Auth.syncProfile(session.user);
                    Auth.updateHeaderUI();
                } else if (event === 'SIGNED_OUT') {
                    Auth.updateHeaderUI();
                }
            });
        }
    }, 1000);
});

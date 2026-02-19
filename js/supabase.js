
/**
 * Supabase Integration for Contact Form
 */

const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';
const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';

let supabaseClient = null;

// Initialize Supabase
function initSupabase() {
    if (window.supabase) {
        try {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('Supabase initialized successfully.');
        } catch (e) {
            console.error('Supabase initialization failed:', e);
            showStatus('시스템 오류: 서버 연결에 실패했습니다.', 'error');
        }
    } else {
        console.error('Supabase SDK not found in window.');
        // Retry once after a short delay in case of slow CDN
        setTimeout(() => {
            if (window.supabase) {
                initSupabase();
            } else {
                showStatus('시스템 오류: 필수 리소스를 불러오지 못했습니다.', 'error');
            }
        }, 1000);
    }
}

// Ensure DOM is ready and SDK is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSupabase();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();

    if (!supabaseClient) {
        // Try initializing again if it failed earlier
        initSupabase();
        if (!supabaseClient) {
            showStatus('서버와 연결되지 않았습니다. 페이지를 새로고침 해주세요.', 'error');
            return;
        }
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    setLoading(true);

    try {
        const { data, error } = await supabaseClient
            .from('contact_us')
            .insert([
                { name: name, email: email, message: message }
            ]);

        if (error) {
            throw error;
        }

        showStatus('문의가 성공적으로 접수되었습니다. 곧 답변 드리겠습니다.', 'success');
        document.getElementById('contact-form').reset();

    } catch (error) {
        console.error('Error submitting form:', error);
        // Detailed error message for debugging (viewable in console), user gets generic message
        if (error.code === '42501' || error.message.includes('violates row-level security')) {
            showStatus('오류: 데이터 저장 권한이 없습니다. (RLS 정책 확인 필요)', 'error');
        } else {
            showStatus(`문의 접수 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`, 'error');
        }
    } finally {
        setLoading(false);
    }
}

// UI Helpers
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

function setLoading(isLoading) {
    if (!submitBtn) return;

    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 접수 중...';
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>문의 보내기</span><i class="fas fa-paper-plane"></i>';
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
}

function showStatus(message, type) {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.classList.remove('hidden', 'text-green-600', 'text-red-600');

    if (type === 'success') {
        formStatus.classList.add('text-green-600');
    } else {
        formStatus.classList.add('text-red-600');
    }

    // Auto hide after 5 seconds
    setTimeout(() => {
        formStatus.classList.add('hidden');
    }, 5000);
}

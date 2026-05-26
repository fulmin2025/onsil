/**
 * Partnership Inquiry Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('partnership-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const originalBtnContent = submitBtn.innerHTML;

        try {
            // Check if Supabase is available via window.Auth
            if (!window.Auth || !window.Auth.getSupabase) {
                throw new Error('시스템 오류: 서비스를 이용할 수 없습니다.');
            }

            const supabase = window.Auth.getSupabase();
            if (!supabase) {
                throw new Error('Supabase SDK를 불러오지 못했습니다.');
            }

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';

            // Get form data
            const formData = new FormData(form);
            const inquiryData = {
                company: formData.get('company'),
                name: formData.get('name'),
                contact: formData.get('contact'),
                email: formData.get('email'),
                type: formData.get('type'),
                title: formData.get('title'),
                content: formData.get('content'),
                created_at: new Date().toISOString(),
                status: 'pending'
            };

            // Insert into Supabase
            const { data, error } = await supabase
                .from('partnership_inquiries')
                .insert([inquiryData]);

            if (error) {
                console.error('Supabase error:', error);
                throw new Error('제안 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }

            // Success state
            alert('제휴 제안이 성공적으로 접수되었습니다. 검토 후 연락드리겠습니다.');
            form.reset();

            // Interaction effect
            submitBtn.innerHTML = '<i class="fas fa-check"></i> 전송 완료';
            submitBtn.classList.remove('bg-brand');
            submitBtn.classList.add('bg-brand-sage');

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.classList.remove('bg-brand-sage');
                submitBtn.classList.add('bg-brand');
            }, 3000);

        } catch (error) {
            console.error('Partnership submission error:', error);
            alert(error.message || '오류가 발생했습니다.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });
});

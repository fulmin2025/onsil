
        // Global reservation handler
        async function handleReservation(facilityId) {
            const user = await Auth.getCurrentUser();
            if (user) {
                window.location.href = 'reservation.html?id=' + encodeURIComponent(facilityId);
            } else {
                alert('예약은 로그인 후 이용 가능합니다.');
                window.location.href = 'login.html';
            }
        }

        // --- Instant Quote Logic ---
        const quoteModal = document.getElementById('quote-modal');
        const quoteContent = document.getElementById('quote-modal-content');

        function openQuoteModal() {
            quoteModal.classList.remove('hidden');
            setTimeout(() => quoteContent.classList.remove('translate-x-full'), 10);
        }

        function closeQuoteModal() {
            quoteContent.classList.add('translate-x-full');
            setTimeout(() => quoteModal.classList.add('hidden'), 300);
        }

        document.getElementById('btn-instant-quote').onclick = openQuoteModal;

        function updateEstimatedQuote() {
            let total = 200000; // Base 5kg
            const weightArr = document.getElementsByName('quote-weight');
            let weight = 5;
            for (let radio of weightArr) {
                if (radio.checked) {
                    weight = parseInt(radio.value);
                    break;
                }
            }

            if (weight === 10) total += 50000;
            if (weight === 20) total += 150000;
            if (weight === 30) total += 250000;

            if (document.getElementById('opt-shroud').checked) total += 100000;
            if (document.getElementById('opt-coffin').checked) total += 150000;
            if (document.getElementById('opt-stone').checked) total += 250000;

            document.getElementById('quote-total').textContent = total.toLocaleString();
            return total;
        }

        // Attach event listeners to radios
        document.querySelectorAll('input[name="quote-weight"]').forEach(r => r.addEventListener('change', updateEstimatedQuote));

        function applyQuoteFilter() {
            const region = document.querySelector('input[name="quote-region"]:checked').value;
            const total = updateEstimatedQuote();

            // Apply standard filters
            const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
            filterCheckboxes.forEach(cb => {
                cb.checked = (cb.value === region);
            });
            document.getElementById('filter-alliance').checked = true; // Always show alliance only for quote results

            // Trigger search filter and switch view
            setTimeout(() => {
                filterItems(); // Correct function name
                showView('list'); // Automatically switch to List View
                closeQuoteModal();
                alert(`선택하신 예산(약 ${total.toLocaleString()}원)과 ${REGION_CONFIG[region]?.name || region} 지역에 기반한 추천 결과입니다.`);
            }, 100);
        }

        if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .catch(err => console.log('SW registration skipped or failed:', err));
            });
        } else if (window.location.protocol === 'file:') {
            console.warn('Onsil: PWA features (Service Worker) are disabled on file:// protocol for security reasons.');
        }

        // Mobile Nav
        function toggleMobileNav() {
            const nav = document.getElementById('mobile-nav');
            const panel = document.getElementById('mobile-nav-panel');
            if (nav.classList.contains('hidden')) {
                nav.classList.remove('hidden');
                requestAnimationFrame(() => panel.classList.add('mobile-nav-open'));
                document.body.style.overflow = 'hidden';
            } else {
                panel.classList.remove('mobile-nav-open');
                document.body.style.overflow = '';
                setTimeout(() => nav.classList.add('hidden'), 300);
            }
        }
    
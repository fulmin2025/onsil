/**
 * Onsil QOL(Quality of Life) Survey Logic
 * Based on CodaPet's QOL Scale and HHHHHHHM criteria
 */

const questions = [
    {
        id: 1,
        title: "식욕 (Hunger)",
        question: "최근 반려동물의 식욕 상태는 어떠한가요?",
        icon: "fa-utensils",
        options: [
            { score: 10, text: "평소와 같이 아주 잘 먹습니다.", desc: "식사 시간을 기다리고 남김없이 먹습니다." },
            { score: 8, text: "조금 망설이지만 결국 다 먹습니다.", desc: "좋아하는 간식을 섞어주면 잘 먹는 편입니다." },
            { score: 6, text: "평소보다 먹는 양이 절반 정도로 줄었습니다.", desc: "사료를 남기거나 먹는 속도가 눈에 띄게 느려졌습니다." },
            { score: 4, text: "좋아하는 간식만 골라 먹습니다.", desc: "사료는 거의 거부하며 기호성이 높은 것만 먹습니다." },
            { score: 2, text: "강제로 먹여야 겨우 조금 먹습니다.", desc: "주사기 급여나 억지로 입에 넣어줘야 합니다." },
            { score: 0, text: "모든 음식과 물을 거부합니다.", desc: "전혀 먹지 않으며 구토 증세가 있을 수 있습니다." }
        ]
    },
    {
        id: 2,
        title: "통증 (Hurt)",
        question: "반려동물이 통증을 느끼거나 불편해 보이나요?",
        icon: "fa-pills",
        options: [
            { score: 10, text: "통증이 전혀 없어 보이며 움직임이 편안합니다.", desc: "활발하게 움직이며 만져도 거부감이 없습니다." },
            { score: 8, text: "특정 자세를 할 때만 아주 약간 불편해 보입니다.", desc: "가끔 주춤하지만 일상생활에 지장은 없습니다." },
            { score: 6, text: "움직일 때 신음하거나 몸을 움츠립니다.", desc: "통증 완화제가 필요해 보이는 상태입니다." },
            { score: 4, text: "만지려고 하면 피하거나 예민하게 반응합니다.", desc: "지속적인 불편함을 느끼고 있는 것으로 보입니다." },
            { score: 2, text: "가만히 있어도 헐떡거리거나 떨고 있습니다.", desc: "통증이 심해 잠을 제대로 자지 못합니다." },
            { score: 0, text: "작은 자극에도 비명을 지르거나 극도로 괴로워합니다.", desc: "응급 상황이며 즉각적인 의료 처치가 필요합니다." }
        ]
    },
    {
        id: 3,
        title: "수분 섭취 (Hydration)",
        question: "수분 섭취 상태나 소화 상태는 어떤가요?",
        icon: "fa-tint",
        options: [
            { score: 10, text: "정상적으로 물을 마시고 배변 상태도 좋습니다.", desc: "피부 탄력이 좋고 입안이 촉촉합니다." },
            { score: 8, text: "평소보다 물을 조금 덜 마시지만 큰 문제는 없습니다.", desc: "피부 탄력이 약간 떨어지거나 변이 조금 딱딱합니다." },
            { score: 6, text: "피부를 당겼을 때 제자리로 오는 속도가 느립니다.", desc: "가벼운 탈수 증세가 보이고 구토나 설사가 가끔 있습니다." },
            { score: 4, text: "물을 거의 마시지 않아 입안이 매우 건조합니다.", desc: "눈이 약간 움푹 들어가 보이며 활력이 없습니다." },
            { score: 2, text: "피하 수액 처치 없이는 탈수가 심각해집니다.", desc: "스스로 물을 삼키기 힘들어합니다." },
            { score: 0, text: "24시간 이상 물을 거부하며 심한 구토/설사가 지속됩니다.", desc: "위험한 탈수 상태이며 장기 기능 저하가 우려됩니다." }
        ]
    },
    {
        id: 4,
        title: "위생 (Hygiene)",
        question: "스스로 청결을 유지하거나 배변 실수가 없나요?",
        icon: "fa-soap",
        options: [
            { score: 10, text: "스스로 그루밍을 잘하고 배변 실수가 전혀 없습니다.", desc: "털이 깨끗하고 지정된 장소에서 배변합니다." },
            { score: 8, text: "가끔 털이 엉키거나 엉덩이 주변이 지저분해집니다.", desc: "그루밍 빈도가 조금 줄었지만 깨끗한 편입니다." },
            { score: 6, text: "몸에 배설물을 묻힐 때가 종종 있습니다.", desc: "움직임이 힘들어 배변 장소까지 가기 어려운 경우가 생깁니다." },
            { score: 4, text: "배변 실수가 잦아지고 누운 자리에서 실수를 합니다.", desc: "보호자의 잦은 위생 관리가 필요합니다." },
            { score: 2, text: "자신의 배설물 위에 계속 누워 있습니다.", desc: "피부 발진이나 욕창 위험이 매우 높습니다." },
            { score: 0, text: "위생 관리가 불가능하여 악취와 피부 괴사가 진행됩니다.", desc: "아이가 스스로의 상태에 대해 수치심이나 괴로움을 느낄 수 있습니다." }
        ]
    },
    {
        id: 5,
        title: "행복감 (Happiness)",
        question: "주변 환경과 가족에 대해 반응하며 즐거워하나요?",
        icon: "fa-smile",
        options: [
            { score: 10, text: "가족을 반기고 장난을 치는 등 매우 행복해 보입니다.", desc: "꼬리를 흔들거나 골골거리는 등 예전과 같습니다." },
            { score: 8, text: "반응은 하지만 예전보다 활력이 조금 떨어졌습니다.", desc: "잠을 더 많이 자지만 깨어있을 때는 즐거워 보입니다." },
            { score: 6, text: "가족이 와도 아주 짧게만 반응하고 금방 눈을 감습니다.", desc: "놀이에 대한 관심이 현저히 줄었습니다." },
            { score: 4, text: "대부분의 시간을 멍하게 있거나 벽만 봅니다.", desc: "주변 상황에 무관심해지고 혼자 있으려 합니다." },
            { score: 2, text: "두려움이나 불안감을 보이며 구석에 숨어있습니다.", desc: "가족의 가벼운 손길에도 소스라치게 놀라기도 합니다." },
            { score: 0, text: "그 어떤 자극에도 전혀 반응하지 않습니다.", desc: "영혼이나 의지가 없는 것처럼 보이며 삶의 의욕을 잃었습니다." }
        ]
    },
    {
        id: 6,
        title: "이동성 (Mobility)",
        question: "스스로 걷거나 일어서는 능력이 충분한가요?",
        icon: "fa-walking",
        options: [
            { score: 10, text: "평소처럼 잘 뛰고 걷습니다.", desc: "산책을 즐기며 계단도 잘 오르내립니다." },
            { score: 8, text: "일어날 때 조금 힘들어하지만 일단 일어나면 잘 걷습니다.", desc: "절뚝거리거나 걸음걸이가 조금 어색할 때가 있습니다." },
            { score: 6, text: "다른 사람의 도움(하네스 등)이 있어야 걷기가 가능합니다.", desc: "오래 서 있기 힘들어하고 자주 주저앉습니다." },
            { score: 4, text: "스스로 일어서지 못하며 제자리에서만 맴돕니다.", desc: "가까운 거리 이동도 누군가의 도움이 필수적입니다." },
            { score: 2, text: "앞다리는 움직이나 뒷다리는 전혀 쓰지 못합니다.", desc: "휠체어가 없으면 이동이 완전히 불가능합니다." },
            { score: 0, text: "누운 상태에서 고개조차 들지 못합니다.", desc: "근육이 거의 소실되었고 스스로 위치를 바꿀 수 없습니다." }
        ]
    },
    {
        id: 7,
        title: "좋은 날과 나쁜 날 (More Good than Bad)",
        question: "반려동물의 하루 중 좋은 순간이 나쁜 순간보다 많은가요?",
        icon: "fa-calendar-check",
        options: [
            { score: 10, text: "매일이 즐겁고 좋은 날들입니다.", desc: "나쁜 순간을 거의 찾아볼 수 없습니다." },
            { score: 8, text: "가끔 힘들 때가 있지만 대부분은 좋은 상태입니다.", desc: "통계적으로 일주일에 6일 이상은 좋은 날입니다." },
            { score: 6, text: "좋은 날과 나쁜 날이 반반입니다.", desc: "상태가 좋았다 나빴다를 반복하여 보호자가 불안합니다." },
            { score: 4, text: "나쁜 날이 더 많아지기 시작했습니다.", desc: "아이가 힘들어하는 모습이 더 자주 눈에 띕니다." },
            { score: 2, text: "일주일 중 하루나 이틀 정도만 겨우 좋아 보입니다.", desc: "나쁜 상태가 만성화되어 가고 있습니다." },
            { score: 0, text: "매일매일이 아이에게 고통스럽고 나쁜 날입니다.", desc: "더 이상 좋은 순간을 기대하기 힘든 상황입니다." }
        ]
    },
    {
        id: 8,
        title: "정신적 평온함 (Anxiety)",
        question: "불안해하거나 인지 능력이 떨어져 보이진 않나요?",
        icon: "fa-brain",
        options: [
            { score: 10, text: "인지 능력이 정상적이며 마음이 평온해 보입니다.", desc: "부르는 소리에 반응하고 가족을 확실히 알아봅니다." },
            { score: 8, text: "가끔 멍하게 있거나 밤에 잠을 설치기도 합니다.", desc: "경증의 인지 장애 증세가 보일 때가 있습니다." },
            { score: 6, text: "좁은 곳에 갇히면 나오지 못하거나 방향을 잃습니다.", desc: "인지 능력이 예전 같지 않음을 자주 느낍니다." },
            { score: 4, text: "지속적인 불안감을 보이며 안절부절못합니다.", desc: "하울링이 심해지거나 가족을 못 알아보는 듯한 행동을 합니다." },
            { score: 2, text: "극심한 패닉 상태에 빠지거나 발작 증세를 보입니다.", desc: "환각을 보는 듯 허공을 향해 짖거나 떨고 있습니다." },
            { score: 0, text: "인지 능력을 완전히 상실하여 의식이 혼미합니다.", desc: "가까운 가족조차 전혀 알아보지 못하는 상태입니다." }
        ]
    },
    {
        id: 9,
        title: "발작 (Seizures)",
        question: "경련이나 발작 증세가 일어나는 빈도가 어떤가요?",
        icon: "fa-bolt",
        options: [
            { score: 10, text: "발작 증세가 전혀 없습니다.", desc: "경련이나 마비 증상이 나타난 적이 없습니다." },
            { score: 8, text: "아주 미세한 근육 떨림만 가끔 있습니다.", desc: "일상생활에는 영향이 없는 수준입니다." },
            { score: 6, text: "가벼운 발작이 한 달에 한두 번 정도 발생합니다.", desc: "약물로 어느 정도 조절이 가능한 상태입니다." },
            { score: 4, text: "강력한 전신 발작이 일주일에 한 번 이상 발생합니다.", desc: "발작 후 회복하는 데 시간이 오래 걸립니다." },
            { score: 2, text: "매일 발작이 일어나며 강도가 매우 심해졌습니다.", desc: "발작 시 부상 위험이 높고 보호자의 밀착 감시가 필요합니다." },
            { score: 0, text: "발작이 끊이지 않고 반복적으로 이어집니다.", desc: "생명이 위급한 중첩 상태이며 뇌 손상이 우려됩니다." }
        ]
    },
    {
        id: 10,
        title: "호흡 (Breathing)",
        question: "숨쉬기 힘들어하거나 헐떡이는 증세가 있나요?",
        icon: "fa-lungs",
        options: [
            { score: 10, text: "호흡이 매우 편안하고 안정적입니다.", desc: "수면 중 호흡수도 정상 범위 내에 있습니다." },
            { score: 8, text: "심한 운동 후에만 조금 헐떡입니다.", desc: "평상시 호흡에는 문제가 없습니다." },
            { score: 6, text: "흥분하지 않아도 가끔 숨을 가쁘게 쉽니다.", desc: "자주 입을 벌리고 숨울 쉬는 모습이 보입니다." },
            { score: 4, text: "조금만 움직여도 쌕쌕거리며 기침을 합니다.", desc: "편안한 자세를 찾지 못하고 계속 뒤척입니다." },
            { score: 2, text: "하루 종일 거친 호흡을 하며 청색증이 나타납니다.", desc: "혀나 잇몸이 보라색으로 변하며 매우 힘들어합니다." },
            { score: 0, text: "목을 길게 빼고 가슴을 크게 움직이며 사투를 벌입니다.", desc: "매 순간이 질식할 듯한 공포스러운 고통 상태입니다." }
        ]
    }
];

let petName = "";
let petAge = "";
let petWeight = "";
let petBreed = "";
let petType = "";
let answers = [];

// Initialize
window.onload = () => {
    // Generate step HTML
    const stepsWrapper = document.getElementById('steps-wrapper');
    questions.forEach((q, idx) => {
        const stepDiv = document.createElement('div');
        stepDiv.id = `step-${q.id}`;
        stepDiv.className = 'step-container';

        let optionsHtml = '';
        q.options.forEach(opt => {
            optionsHtml += `
                <button onclick="selectOption(${q.id}, ${opt.score})" class="option-card w-full text-left p-4 rounded-2xl bg-white border border-brand/5 mb-3">
                    <div class="flex items-center justify-between mb-1">
                        <span class="font-bold text-brand">${opt.text}</span>
                        <span class="text-xs bg-brand/5 px-2 py-1 rounded text-brand/40">${opt.score}점</span>
                    </div>
                    <p class="text-sm text-brand/40">${opt.desc}</p>
                </button>
            `;
        });

        stepDiv.innerHTML = `
            <div class="mb-8">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-brand-warm/10 flex items-center justify-center text-brand-warm">
                        <i class="fas ${q.icon}"></i>
                    </div>
                    <h3 class="font-bold text-gray-400 text-sm uppercase tracking-widest">${q.title}</h3>
                </div>
                <h2 class="text-2xl font-bold font-serif mb-2">${q.question}</h2>
                <p class="text-brand/50 text-sm">해당하는 항목을 하나 선택해 주세요.</p>
            </div>
            <div class="space-y-3">
                ${optionsHtml}
            </div>
            <div class="mt-8 flex justify-between">
                <button onclick="prevStep()" class="text-brand/40 font-bold text-sm hover:text-brand transition-colors">이전으로</button>
                <div class="text-xs text-brand/20 font-mono">ON-SIL QOL SCALE v1.0</div>
            </div>
        `;
        stepsWrapper.appendChild(stepDiv);
    });
};

function setPetType(type) {
    petType = type;
    document.getElementById('type-dog').classList.remove('selected', 'border-brand-warm', 'bg-brand-cream');
    document.getElementById('type-cat').classList.remove('selected', 'border-brand-warm', 'bg-brand-cream');

    const btn = document.getElementById(`type-${type}`);
    btn.classList.add('selected', 'border-brand-warm', 'bg-brand-cream');
}

function startSurvey() {
    petName = document.getElementById('pet-name').value.trim();
    petAge = document.getElementById('pet-age').value.trim();
    petWeight = document.getElementById('pet-weight').value.trim();
    petBreed = document.getElementById('pet-breed').value.trim();

    if (!petType) {
        alert('반려동물의 종류(강아지/고양이)를 선택해주세요.');
        return;
    }
    if (!petName) {
        alert('반려동물의 이름을 입력해주세요.');
        return;
    }
    if (!petAge) {
        alert('반려동물의 나이를 입력해주세요.');
        return;
    }

    currentStep = 1;
    updateUI();
}

function selectOption(questionId, score) {
    answers[questionId - 1] = score;

    if (currentStep < 10) {
        currentStep++;
        updateUI();
    } else {
        showResult();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateUI();
    } else {
        currentStep = 0;
        updateUI();
    }
}

function updateUI() {
    // Hide all
    document.querySelectorAll('.step-container').forEach(el => el.classList.remove('active'));

    if (currentStep === 0) {
        document.getElementById('start-screen').classList.add('active');
        document.getElementById('step-indicator').innerText = 'Starting...';
        document.getElementById('progress-line').style.width = '0%';
    } else {
        const target = document.getElementById(`step-${currentStep}`);
        if (target) target.classList.add('active');

        document.getElementById('step-indicator').innerText = `Step ${currentStep} / 10`;
        const percentage = (currentStep / 10) * 100;
        document.getElementById('progress-line').style.width = `${percentage}%`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showResult() {
    currentStep = 11; // Result state
    document.querySelectorAll('.step-container').forEach(el => el.classList.remove('active'));
    document.getElementById('result-screen').classList.add('active');
    document.getElementById('progress-line').style.width = '100%';
    document.getElementById('step-indicator').innerText = 'Completed';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const totalScore = answers.reduce((a, b) => a + b, 0);
    document.getElementById('total-score').innerText = totalScore;
    document.getElementById('result-pet-name').innerText = petName;

    const badge = document.getElementById('result-badge');
    const desc = document.getElementById('result-description');

    if (totalScore >= 70) {
        badge.innerText = "안정적인 삶의 질";
        badge.className = "inline-block px-6 py-2 rounded-full font-bold text-lg mb-6 bg-brand-sage text-white";
        desc.innerHTML = `"${petName}(이)는 현재 비교적 안정적인 삶의 질을 유지하고 있습니다. <br>가족과 함께하는 소중한 시간을 충분히 즐기고 있는 것으로 보입니다. 지금처럼 따뜻한 보살핌을 계속해주세요."`;
    } else if (totalScore >= 40) {
        badge.innerText = "주의 깊은 관찰 필요";
        badge.className = "inline-block px-6 py-2 rounded-full font-bold text-lg mb-6 bg-brand-warm text-white";
        desc.innerHTML = `"${petName}(이)의 삶의 질이 조금씩 저하되고 있는 신호가 확인됩니다. <br>일부 영역에서 불편함을 느끼고 있을 수 있습니다. 수의사와의 상담을 통해 통증 관리나 환경 개선을 논의해보시는 것을 추천드립니다."`;
    } else {
        badge.innerText = "이별을 준비해야 할 시기";
        badge.className = "inline-block px-6 py-2 rounded-full font-bold text-lg mb-6 bg-brand text-white";
        desc.innerHTML = `"${petName}(이)는 현재 많은 고통을 겪고 있으며 삶의 질이 매우 낮은 상태입니다. <br>아이가 더 이상 괴롭지 않도록 평화로운 이별을 고려해볼 시점일 수 있습니다. 호스피스 케어나 안락사에 대해 전문가와 깊이 있는 상담을 나눠보세요."`;
    }

    // Save to Supabase
    saveResultToDB(totalScore);
}

async function saveResultToDB(totalScore) {
    const sb = (window.Auth && window.Auth.getSupabase) ? window.Auth.getSupabase() : window.supabase;
    
    if (!sb) {
        console.error("Supabase client not found");
        return;
    }

    try {
        const { data: { user } } = await sb.auth.getUser();
        const resultData = {
            user_id: user ? user.id : null,
            pet_name: petName,
            pet_age: parseInt(petAge),
            pet_weight: parseFloat(petWeight) || null,
            pet_type: petType,
            pet_breed: petBreed,
            total_score: totalScore,
            answers: answers,
            created_at: new Date().toISOString()
        };

        const { error } = await sb
            .from('qol_results')
            .insert([resultData]);

        if (error) throw error;
        console.log("Result saved successfully");
    } catch (error) {
        console.error("Error saving QOL result:", error.message);
    }
}

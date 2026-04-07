document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));

    // --- MAP LOGIC START ---
    const btnUnidade1 = document.getElementById('btn-unidade1');
    const btnUnidade2 = document.getElementById('btn-unidade2');
    const btnUnidade3 = document.getElementById('btn-unidade3');
    const btnUnidade4 = document.getElementById('btn-unidade4');
    const btnUnidade5 = document.getElementById('btn-unidade5');
    
    const infoUnidade1 = document.getElementById('info-unidade1');
    const infoUnidade2 = document.getElementById('info-unidade2');
    const infoUnidade3 = document.getElementById('info-unidade3');
    const infoUnidade4 = document.getElementById('info-unidade4');
    const infoUnidade5 = document.getElementById('info-unidade5');
    
    const mapIframe = document.getElementById('map-iframe');

    // Agrupando em arrays para facilitar a manipulação
    const buttons = [btnUnidade1, btnUnidade2, btnUnidade3, btnUnidade4, btnUnidade5];
    const infos = [infoUnidade1, infoUnidade2, infoUnidade3, infoUnidade4, infoUnidade5];
    
    // Links do Google Maps Embed com os endereços atualizados dos CNPJs
    const maps = [
        "https://maps.google.com/maps?q=Av.+Inocencio+Serafico,+3720,+Vila+Silva+Ribeiro,+Carapicuiba+-+SP&t=&z=15&ie=UTF8&iwloc=&output=embed", // Unidade 1: Vila Silva Ribeiro [cite: 216, 217, 221, 222, 225, 227, 228, 239]
        "https://maps.google.com/maps?q=Av.+Miriam,+329,+Centro,+Carapicuiba+-+SP&t=&z=15&ie=UTF8&iwloc=&output=embed", // Unidade 2: Carapicuíba Centro [cite: 170, 171, 172, 174, 178, 179, 187, 188, 194]
        "https://maps.google.com/maps?q=Av.+Rubens+Caramez,+354,+Centro,+Itapevi+-+SP&t=&z=15&ie=UTF8&iwloc=&output=embed", // Unidade 3: Itapevi Centro (Rubens) [cite: 121, 122, 126, 127, 134, 135, 137, 143]
        "https://maps.google.com/maps?q=Av.+Cesario+de+Abreu,+220,+Centro,+Itapevi+-+SP&t=&z=15&ie=UTF8&iwloc=&output=embed", // Unidade 4: Itapevi Centro (Cesário) [cite: 71, 72, 76, 77, 85, 86, 88, 91]
        "https://maps.google.com/maps?q=Av.+Comen+Sant'Anna,+940,+Capao+Redondo,+Sao+Paulo+-+SP&t=&z=15&ie=UTF8&iwloc=&output=embed"  // Unidade 5: Capão Redondo [cite: 23, 24, 25, 26, 27, 30, 31, 32]
    ];

    // Classes exatas do Tailwind usadas no HTML
    const activeClass = ['bg-brand-cyan', 'text-white', 'shadow-glow', 'transform', 'scale-105', 'ring-2', 'ring-brand-cyan', 'ring-offset-2', 'ring-offset-slate-900'];
    const inactiveClass = ['bg-slate-800', 'text-slate-400', 'hover:bg-slate-700', 'hover:text-white'];

    // Função para trocar a unidade selecionada
    function changeLocation(selectedIndex) {
        if(mapIframe) mapIframe.src = maps[selectedIndex];

        buttons.forEach((btn, index) => {
            if (!btn || !infos[index]) return; // Prevenção de erros caso algum elemento não exista
            
            if (index === selectedIndex) {
                // Ativa botão e mostra info
                btn.classList.remove(...inactiveClass);
                btn.classList.add(...activeClass);
                infos[index].classList.remove('hidden');
                infos[index].classList.add('block');
            } else {
                // Desativa botão e esconde info
                btn.classList.remove(...activeClass);
                btn.classList.add(...inactiveClass);
                infos[index].classList.remove('block');
                infos[index].classList.add('hidden');
            }
        });
    }

    // Adiciona os eventos de clique
    if (btnUnidade1) btnUnidade1.addEventListener('click', () => changeLocation(0));
    if (btnUnidade2) btnUnidade2.addEventListener('click', () => changeLocation(1));
    if (btnUnidade3) btnUnidade3.addEventListener('click', () => changeLocation(2));
    if (btnUnidade4) btnUnidade4.addEventListener('click', () => changeLocation(3));
    if (btnUnidade5) btnUnidade5.addEventListener('click', () => changeLocation(4));

    // Inicializa a primeira unidade como ativa
    changeLocation(0);
    // --- MAP LOGIC END ---

    // Header Scroll
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('shadow-md');
            else header.classList.remove('shadow-md');
        });
    }
});

// --- MODAL LOGIC ---
const modal = document.getElementById('privacy-modal');
const openBtn = document.getElementById('open-privacy');
const closeBtns = document.querySelectorAll('#close-modal, #close-modal-btn');

function toggleModal(show) {
    if (!modal) return;

    if (show) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('div').classList.remove('scale-95');
            modal.querySelector('div').classList.add('scale-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.remove('scale-100');
        modal.querySelector('div').classList.add('scale-95');
        document.body.style.overflow = '';

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

if (openBtn) {
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    });
}

if (closeBtns) {
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleModal(false));
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            toggleModal(false);
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        toggleModal(false);
    }
});
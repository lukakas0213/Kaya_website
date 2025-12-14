// 페이지 네비게이션 기능
class PageNavigator {
    constructor() {
        this.initEventListeners();
        this.showPage('home'); // 디폴트로 홈 페이지 표시
    }

    initEventListeners() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                this.showPage(pageId);
                this.setActiveNav(link);
            });
        });
    }

    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(pageId + '-page');
        if (targetPage) {
            targetPage.classList.add('active');
            if (pageId === 'me') {
                // Masonry 배치 적용 (이미지 로드 후 한 번 더 계산)
                applyMasonry();
                setTimeout(applyMasonry, 50);
            }
        }
    }

    setActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PageNavigator();
    // 초기 로드 시 ME 페이지가 활성화된 경우 대비
    const activeMe = document.getElementById('me-page');
    if (activeMe && activeMe.classList.contains('active')) {
        applyMasonry();
    }
});

// ===== Masonry helpers =====
function applyMasonry() {
    const grid = document.querySelector('#me-page .artwork-collage');
    if (!grid) return;

    const items = grid.querySelectorAll('.artwork-item');
    const styles = window.getComputedStyle(grid);
    const rowHeight = parseInt(styles.getPropertyValue('grid-auto-rows')) || 8;
    const rowGap = parseInt(styles.getPropertyValue('row-gap')) || 0;

    items.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;
        // If image not loaded yet, wait for it
        if (!img.complete) {
            img.addEventListener('load', () => sizeItem(item, rowHeight, rowGap));
        }
        sizeItem(item, rowHeight, rowGap);
    });
}

function sizeItem(item, rowHeight, rowGap) {
    const content = item.querySelector('img');
    if (!content) return;
    const itemHeight = content.getBoundingClientRect().height;
    const span = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${span}`;
}

// Recalculate on resize (debounced)
window.addEventListener('resize', debounce(applyMasonry, 150));

function debounce(fn, wait) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

const STAGE_WIDTH = 1366;
const DESIGN_HEIGHT = 768;

// ME 아트보드만 세로로 길다 (스크롤됨)
const PAGE_HEIGHT = {
    home: 768,
    me: 1626,
    info: 768,
    contact: 768
};

// 페이지별 네비게이션 이미지 — 현재 페이지의 라벨만 강조된 버전을 쓴다.
// PSD 는 페이지마다 nav 가 최대 17px 어긋나 있어, 라벨별 공통 중심축
// (x = 875 / 1008 / 1192, y = 78) 에 맞춘 뒤 정수 픽셀로 반올림했다.
// 강조 버전은 크기가 달라 left/top 도 페이지마다 달라진다.
const NAV_ASSETS = {
    home: {
        me: { src: 'images/home/search_bar/ME.png', left: 841, top: 60, width: 68, height: 36 },
        info: { src: 'images/home/search_bar/Info.png', left: 966, top: 59, width: 85, height: 38 },
        contact: { src: 'images/home/search_bar/Contact.png', left: 1101, top: 60, width: 183, height: 37 }
    },
    me: {
        me: { src: 'images/me/search_bar/ME.png', left: 841, top: 60, width: 68, height: 36 },
        info: { src: 'images/me/search_bar/Info.png', left: 966, top: 59, width: 85, height: 38 },
        contact: { src: 'images/me/search_bar/Contact.png', left: 1101, top: 60, width: 183, height: 37 }
    },
    info: {
        me: { src: 'images/info/search_bar/ME.png', left: 841, top: 60, width: 68, height: 36 },
        info: { src: 'images/info/search_bar/Info.png', left: 964, top: 51, width: 88, height: 54 },
        contact: { src: 'images/info/search_bar/Contact.png', left: 1101, top: 60, width: 183, height: 37 }
    },
    contact: {
        me: { src: 'images/contact/search_bar/ME.png', left: 841, top: 60, width: 68, height: 36 },
        info: { src: 'images/contact/search_bar/Info.png', left: 966, top: 59, width: 84, height: 38 },
        contact: { src: 'images/contact/search_bar/Contact.png', left: 1111, top: 51, width: 162, height: 55 }
    }
};

const viewport = document.querySelector('.viewport');
const stage = document.querySelector('.stage');
let currentPage = 'home';

function applyScale() {
    const scale = Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / DESIGN_HEIGHT);
    const pageHeight = PAGE_HEIGHT[currentPage];
    const scaledHeight = pageHeight * scale;

    document.documentElement.style.setProperty('--scale', scale);
    stage.style.height = pageHeight + 'px';
    stage.style.top = Math.max(0, (window.innerHeight - scaledHeight) / 2) + 'px';
    viewport.style.height = Math.max(window.innerHeight, scaledHeight) + 'px';
}

function updateNavIcons(pageId) {
    const assets = NAV_ASSETS[pageId];
    ['me', 'info', 'contact'].forEach(key => {
        const icon = assets[key];
        const img = document.getElementById('nav-icon-' + key);
        img.src = icon.src;
        img.width = icon.width;
        img.height = icon.height;
        img.parentElement.style.left = icon.left + 'px';
        img.parentElement.style.top = icon.top + 'px';
    });
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId + '-page').classList.add('active');

    currentPage = pageId;
    updateNavIcons(pageId);
    applyScale();
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            showPage(link.dataset.page);
        });
    });
    showPage('home');
});

window.addEventListener('resize', applyScale);

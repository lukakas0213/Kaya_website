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
});

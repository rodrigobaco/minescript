/* =====================================================
   MINESCRIPT — script.js
   Sem dependências externas. Navegação por estado.
===================================================== */

(function () {
    'use strict';

    /* ─── SVGs inline ─── */
    const SVG = {
        folder: `
            <svg viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="10" width="72" height="50" rx="5" fill="#c88a1a"/>
                <rect x="0" y="10" width="72" height="50" rx="5" fill="url(#fgrad)"/>
                <path d="M0 18 Q0 10 8 10 H28 L36 18 H64 Q72 18 72 26 V55 Q72 60 67 60 H5 Q0 60 0 55 Z" fill="#e8a020"/>
                <path d="M0 22 H72 V26 H0 Z" fill="#c88a1a" opacity="0.4"/>
                <defs>
                    <linearGradient id="fgrad" x1="36" y1="10" x2="36" y2="60" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#fff" stop-opacity="0.1"/>
                        <stop offset="1" stop-color="#000" stop-opacity="0.15"/>
                    </linearGradient>
                </defs>
            </svg>`,

        pdf: `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>`,

        download: `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>`,

        soon: `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
            </svg>`
    };

    /* ─── Dados dos projetos ─── */
    const projects = {
        1: {
            title: 'Projeto 1',
            description: 'Descrição breve do projeto.',
            tags: ['roteiro', 'draft'],
            files: [
                { name: 'Roteiro_Final', ext: 'pdf', available: true,  action: () => alert('Download iniciado...') },
            ]
        },
        2: {
            title: 'Projeto 2',
            description: 'Descrição breve do projeto.',
            tags: ['em andamento'],
            files: [
                { name: 'Roteiro', ext: 'pdf', available: false },
            ]
        },
        3: {
            title: 'Projeto 3',
            description: 'Descrição breve do projeto.',
            tags: ['em andamento'],
            files: [
                { name: 'Roteiro', ext: 'pdf', available: false },
            ]
        }
    };

    /* ─── Conteúdo de páginas estáticas ─── */
    const staticPages = {
        sobre: {
            title: 'Sobre',
            body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Preencha esta seção com informações sobre você.</p>`
        },
        contato: {
            title: 'Contato',
            body: `<p>Email: <a href="mailto:voce@email.com" style="color: var(--accent)">voce@email.com</a></p>`
        }
    };

    /* ─── Estado da aplicação ─── */
    let state = { page: 'home', projectId: null };

    /* ─── Elementos do DOM ─── */
    const mainContent  = document.getElementById('main-content');
    const menuToggle   = document.getElementById('menu-toggle');
    const sidebar      = document.getElementById('sidebar');
    const overlay      = document.getElementById('overlay');
    const backBtn      = document.getElementById('back-btn');
    const breadRoot    = document.getElementById('breadcrumb-root');
    const breadSep     = document.getElementById('breadcrumb-sep');
    const breadCurrent = document.getElementById('breadcrumb-current');

    /* ─── Menu hambúrguer ─── */
    function openMenu() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('menu-open');
        sidebar.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        sidebar.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    menuToggle.addEventListener('click', () =>
        sidebar.classList.contains('active') ? closeMenu() : openMenu()
    );
    overlay.addEventListener('click', closeMenu);

    /* ─── Breadcrumb ─── */
    function setBreadcrumb(label) {
        if (label) {
            breadSep.style.display  = 'inline';
            breadCurrent.textContent = label;
            breadRoot.style.color   = 'var(--text-faint)';
        } else {
            breadSep.style.display  = 'none';
            breadCurrent.textContent = '';
            breadRoot.style.color   = 'var(--text-muted)';
        }
    }

    /* ─── Utilitário: injetar com fade ─── */
    function renderTo(html) {
        mainContent.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'fade-up';
        wrapper.innerHTML = html;
        mainContent.appendChild(wrapper);
    }

    /* ─── Página inicial: grid de pastas ─── */
    function showHome() {
        state = { page: 'home', projectId: null };
        backBtn.style.display = 'none';
        setBreadcrumb(null);

        document.querySelectorAll('#sidebar li').forEach(li =>
            li.classList.toggle('active', li.dataset.page === 'home')
        );

        const folders = Object.entries(projects).map(([id, proj]) => `
            <div class="folder" data-project="${id}" role="button" tabindex="0"
                 aria-label="Abrir ${proj.title}">
                <div class="folder-icon">${SVG.folder}</div>
                <span class="folder-label">${proj.title}</span>
            </div>
        `).join('');

        renderTo(`<div class="projects-grid">${folders}</div>`);

        mainContent.querySelectorAll('.folder').forEach(el => {
            el.addEventListener('click', () => openProject(el.dataset.project));
            el.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') openProject(el.dataset.project);
            });
        });
    }

    /* ─── Página de projeto ─── */
    function openProject(id) {
        const proj = projects[id];
        if (!proj) return;

        state = { page: 'project', projectId: id };
        backBtn.style.display = 'inline-flex';
        setBreadcrumb(proj.title);

        const tagsHtml = proj.tags.map(t => `<span class="badge">${t}</span>`).join('');

        const filesHtml = proj.files.length
            ? proj.files.map(f => {
                const fileName = `${f.name}.${f.ext}`;
                if (f.available) {
                    return `
                        <div class="file-item" role="button" tabindex="0"
                             aria-label="Download ${fileName}">
                            <div class="file-icon">${SVG.pdf}</div>
                            <div class="file-info">
                                <div class="file-name">${f.name}</div>
                                <div class="file-type">${f.ext}</div>
                            </div>
                            <span class="file-action">${SVG.download}</span>
                        </div>`;
                } else {
                    return `
                        <div class="file-item" role="button" tabindex="0"
                             aria-label="${fileName} — em breve"
                             style="opacity: 0.45; cursor: default;" aria-disabled="true">
                            <div class="file-icon">${SVG.pdf}</div>
                            <div class="file-info">
                                <div class="file-name">${f.name}</div>
                                <div class="file-type">${f.ext}</div>
                            </div>
                            <span class="file-action">${SVG.soon}</span>
                        </div>`;
                }
            }).join('')
            : `<div class="empty-state">Nenhum arquivo disponível.</div>`;

        renderTo(`
            <div class="project-view">
                <div class="project-header">
                    <h1 class="project-title">${proj.title}</h1>
                    <div class="project-meta">
                        ${tagsHtml}
                    </div>
                </div>
                <p class="project-section-label">arquivos</p>
                <div class="files-grid">${filesHtml}</div>
            </div>
        `);

        /* Eventos de clique nos arquivos disponíveis */
        mainContent.querySelectorAll('.file-item:not([aria-disabled])').forEach((el, idx) => {
            const file = proj.files.filter(f => f.available)[idx];
            if (!file) return;
            el.addEventListener('click', () => file.action?.());
            el.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') file.action?.();
            });
        });
    }

    /* ─── Páginas estáticas ─── */
    function showStaticPage(key) {
        const pg = staticPages[key];
        state = { page: key, projectId: null };
        backBtn.style.display = 'none';
        setBreadcrumb(null);

        renderTo(`
            <div class="static-page">
                <h2>${pg.title}</h2>
                ${pg.body}
            </div>
        `);
    }

    /* ─── Botão voltar ─── */
    backBtn.addEventListener('click', showHome);

    /* ─── Sidebar: navegação ─── */
    document.querySelectorAll('#sidebar li').forEach(li => {
        li.addEventListener('click', () => {
            document.querySelectorAll('#sidebar li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            closeMenu();

            const pg = li.dataset.page;
            if (pg === 'home') showHome();
            else showStaticPage(pg);
        });
    });

    /* ─── Inicializar ─── */
    showHome();

})();
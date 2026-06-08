/* =====================================================
   MINESCRIPT — script.js
===================================================== */

(function () {
    'use strict';

    /* ─── SVGs ─── */
    const SVG = {
        folder: `<svg viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="10" width="72" height="50" rx="5" fill="#c88a1a"/>
            <rect x="0" y="10" width="72" height="50" rx="5" fill="url(#fg1)"/>
            <path d="M0 18 Q0 10 8 10 H28 L36 18 H64 Q72 18 72 26 V55 Q72 60 67 60 H5 Q0 60 0 55 Z" fill="#e8a020"/>
            <path d="M0 22 H72 V26 H0 Z" fill="#c88a1a" opacity="0.4"/>
            <defs><linearGradient id="fg1" x1="36" y1="10" x2="36" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#fff" stop-opacity="0.1"/>
                <stop offset="1" stop-color="#000" stop-opacity="0.15"/>
            </linearGradient></defs>
        </svg>`,
        pdf: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>`,
        image: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
        </svg>`,
        folderIcon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>`,
        eye: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>`,
        open: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>`,
        soon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
        </svg>`
    };

    const isImage = ext => ['jpg','jpeg','png','gif','webp','svg'].includes(ext);
    const getFileIcon = ext => isImage(ext) ? SVG.image : SVG.pdf;

    /* ─── Dados ─── */
    const projects = [
        {
            id: 1, title: 'Untitled #1', tags: ['roteiro', 'draft'],
            items: [
                { type: 'file',   name: 'Roteiro',     ext: 'pdf', url: 'assets/pdf_sample_2.pdf' },
                { type: 'file',   name: 'Logline',     ext: 'pdf', url: '' },
                { type: 'file',   name: 'Personagens', ext: 'pdf', url: '' },
                { type: 'folder', name: 'Referências', items: [
                    { name: 'Historia-do-Centro-de-Sao-Paulo', ext: 'webp', url: 'assets/images/Historia-do-Centro-de-Sao-Paulo.webp' }
                ]}
            ]
        },
        {
            id: 2, title: 'Untitled #2', tags: ['em andamento'],
            items: [
                { type: 'file',   name: 'Roteiro',     ext: 'pdf', url: '' },
                { type: 'file',   name: 'Logline',     ext: 'pdf', url: '' },
                { type: 'file',   name: 'Personagens', ext: 'pdf', url: '' },
                { type: 'folder', name: 'Referências', items: [] }
            ]
        },
        {
            id: 3, title: 'Untitled #3', tags: ['em andamento'],
            items: [
                { type: 'file',   name: 'Roteiro',     ext: 'pdf', url: '' },
                { type: 'file',   name: 'Logline',     ext: 'pdf', url: '' },
                { type: 'file',   name: 'Personagens', ext: 'pdf', url: '' },
                { type: 'folder', name: 'Referências', items: [] }
            ]
        }
    ];

    const staticPages = {
        sobre: {
            title: 'Sobre',
            body: `
                <p>Trabalho com TI há uns 3 anos e, faz um tempo, comecei a desenvolver algumas ideias de roteiro que ficavam só na cabeça.</p>
                <p>Em algum momento pareceu natural misturar os dois — usar o que sei de tecnologia pra ajudar nesse processo criativo. Esse site é basicamente isso: um lugar pra organizar e compartilhar o que estou construindo.</p>
                <p>Ainda é tudo muito no começo, mas a ideia é ir preenchendo conforme as coisas tomam forma.</p>
            `
        },
        contato: {
            title: 'Contato',
            body: `<p>Em breve. Ainda estou definindo por onde prefiro ser encontrado.</p>`
        }
    };

    /* ─── Estado ─── */
    let state = { page: 'home', projectId: null, folderName: null };

    /* ─── DOM ─── */
    const mainContent  = document.getElementById('main-content');
    const menuToggle   = document.getElementById('menu-toggle');
    const sidebar      = document.getElementById('sidebar');
    const overlay      = document.getElementById('overlay');
    const backBtn      = document.getElementById('back-btn');
    const breadRoot    = document.getElementById('breadcrumb-root');
    const breadSep     = document.getElementById('breadcrumb-sep');
    const breadCurrent = document.getElementById('breadcrumb-current');

    /* ─── Modal — criado via JS e anexado ao <html> diretamente ─── */
    // Isso garante que body{overflow:hidden} não corte o modal
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 9999;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

    modal.innerHTML = `
        <div id="modal-overlay" style="
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.85);
        "></div>
        <div id="modal-box" style="
            position: relative;
            z-index: 1;
            background: #161616;
            border: 1px solid #2a2a2a;
            border-radius: 10px;
            width: calc(100vw - 40px);
            max-width: 900px;
            height: calc(100vh - 80px);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        ">
            <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px;
                border-bottom: 1px solid #2a2a2a;
                flex-shrink: 0;
                gap: 12px;
            ">
                <span id="modal-title" style="
                    font-family: 'Space Mono', monospace;
                    font-size: 12px;
                    color: #888;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    flex: 1;
                "></span>
                <div style="display:flex; gap:8px; flex-shrink:0;">
                    <a id="modal-download" download style="
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        background: none;
                        border: 1px solid #2a2a2a;
                        border-radius: 6px;
                        color: #888;
                        font-family: 'DM Sans', sans-serif;
                        font-size: 12px;
                        padding: 5px 10px;
                        cursor: pointer;
                        text-decoration: none;
                    ">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Baixar
                    </a>
                    <button id="modal-close" style="
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        background: none;
                        border: 1px solid #2a2a2a;
                        border-radius: 6px;
                        color: #888;
                        padding: 5px 8px;
                        cursor: pointer;
                    " aria-label="Fechar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="modal-body" style="
                flex: 1;
                overflow: auto;
                display: flex;
                align-items: stretch;
                background: #0e0e0e;
                min-height: 0;
            "></div>
        </div>
    `;

    // Anexa ao <html>, não ao <body>
    document.documentElement.appendChild(modal);

    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose   = document.getElementById('modal-close');
    const modalTitle   = document.getElementById('modal-title');
    const modalBody    = document.getElementById('modal-body');
    const modalDl      = document.getElementById('modal-download');

    function openModal(file) {
        modalTitle.textContent   = `${file.name}.${file.ext}`;
        modalDl.href             = file.url;
        modalDl.download         = `${file.name}.${file.ext}`;
        modalBody.innerHTML      = '';

        if (isImage(file.ext)) {
            const img = document.createElement('img');
            img.src = file.url;
            img.alt = file.name;
            img.style.cssText = 'max-width:100%; max-height:100%; object-fit:contain; display:block; margin:auto; padding:16px;';
            modalBody.appendChild(img);
        } else {
            const iframe = document.createElement('iframe');
            iframe.src   = file.url;
            iframe.title = file.name;
            iframe.style.cssText = 'width:100%; height:100%; border:none; background:#fff; flex:1;';
            modalBody.appendChild(iframe);
        }

        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalBody.innerHTML = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    /* ─── Menu ─── */
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
    function setBreadcrumb(parts) {
        if (!parts || !parts.length) {
            breadSep.style.display   = 'none';
            breadCurrent.textContent = '';
            breadRoot.style.color    = 'var(--text-muted)';
        } else {
            breadSep.style.display   = 'inline';
            breadCurrent.textContent = parts.join(' / ');
            breadRoot.style.color    = 'var(--text-faint)';
        }
    }

    function renderTo(html) {
        mainContent.innerHTML = '';
        const w = document.createElement('div');
        w.className = 'fade-up';
        w.innerHTML = html;
        mainContent.appendChild(w);
    }

    function renderFileItem(f) {
        const hasUrl = f.url && f.url.trim() !== '';
        const icon   = getFileIcon(f.ext);
        const label  = `${f.name}.${f.ext}`;
        if (hasUrl) {
            return `
                <div class="file-item" role="button" tabindex="0"
                     data-url="${f.url}" data-name="${f.name}" data-ext="${f.ext}"
                     aria-label="Visualizar ${label}">
                    <div class="file-icon">${icon}</div>
                    <div class="file-info">
                        <div class="file-name">${f.name}</div>
                        <div class="file-type">${f.ext}</div>
                    </div>
                    <span class="file-action">${SVG.eye}</span>
                </div>`;
        }
        return `
            <div class="file-item" aria-label="${label} — em breve"
                 style="opacity:0.45; cursor:default;" aria-disabled="true">
                <div class="file-icon">${icon}</div>
                <div class="file-info">
                    <div class="file-name">${f.name}</div>
                    <div class="file-type">${f.ext}</div>
                </div>
                <span class="file-action">${SVG.soon}</span>
            </div>`;
    }

    function renderFolderItem(folder, projectId) {
        const hasItems = folder.items && folder.items.length > 0;
        const count    = hasItems ? `${folder.items.length} ${folder.items.length === 1 ? 'item' : 'itens'}` : 'vazia';
        return `
            <div class="file-item file-item--folder ${!hasItems ? 'file-item--empty' : ''}"
                 role="button" tabindex="${hasItems ? 0 : -1}"
                 data-folder="${folder.name}" data-project="${projectId}"
                 aria-label="Abrir ${folder.name}"
                 style="${!hasItems ? 'opacity:0.45; cursor:default;' : ''}">
                <div class="file-icon" style="color:var(--accent)">${SVG.folderIcon}</div>
                <div class="file-info">
                    <div class="file-name">${folder.name}</div>
                    <div class="file-type">${count}</div>
                </div>
                <span class="file-action">${hasItems ? SVG.open : SVG.soon}</span>
            </div>`;
    }

    function bindFileItems(container) {
        container.querySelectorAll('.file-item[data-url]').forEach(el => {
            const open = () => openModal({ url: el.dataset.url, name: el.dataset.name, ext: el.dataset.ext });
            el.addEventListener('click', open);
            el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
        });
    }

    function showHome() {
        state = { page: 'home', projectId: null, folderName: null };
        backBtn.style.display = 'none';
        setBreadcrumb([]);
        document.querySelectorAll('#sidebar li').forEach(li =>
            li.classList.toggle('active', li.dataset.page === 'home')
        );
        renderTo(`<div class="projects-grid">${
            projects.map(proj => `
                <div class="folder" data-project="${proj.id}" role="button" tabindex="0"
                     aria-label="Abrir ${proj.title}">
                    <div class="folder-icon">${SVG.folder}</div>
                    <span class="folder-label">${proj.title}</span>
                </div>`).join('')
        }</div>`);
        mainContent.querySelectorAll('.folder').forEach(el => {
            el.addEventListener('click', () => openProject(Number(el.dataset.project)));
            el.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') openProject(Number(el.dataset.project));
            });
        });
    }

    function openProject(id) {
        const proj = projects.find(p => p.id === id);
        if (!proj) return;
        state = { page: 'project', projectId: id, folderName: null };
        backBtn.style.display = 'inline-flex';
        setBreadcrumb([proj.title]);
        const tagsHtml  = (proj.tags || []).map(t => `<span class="badge">${t}</span>`).join('');
        const itemsHtml = proj.items && proj.items.length
            ? proj.items.map(item =>
                item.type === 'folder' ? renderFolderItem(item, id) : renderFileItem(item)
              ).join('')
            : `<div class="empty-state">Nenhum arquivo disponível.</div>`;
        renderTo(`
            <div class="project-view">
                <div class="project-header">
                    <h1 class="project-title">${proj.title}</h1>
                    <div class="project-meta">${tagsHtml}</div>
                </div>
                <p class="project-section-label">arquivos</p>
                <div class="files-grid">${itemsHtml}</div>
            </div>`);
        bindFileItems(mainContent);
        mainContent.querySelectorAll('.file-item--folder:not(.file-item--empty)').forEach(el => {
            el.addEventListener('click', () => openFolder(id, el.dataset.folder));
            el.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') openFolder(id, el.dataset.folder);
            });
        });
    }

    function openFolder(projectId, folderName) {
        const proj   = projects.find(p => p.id === projectId);
        const folder = proj && proj.items.find(i => i.type === 'folder' && i.name === folderName);
        if (!proj || !folder) return;
        state = { page: 'folder', projectId, folderName };
        backBtn.style.display = 'inline-flex';
        setBreadcrumb([proj.title, folder.name]);
        const itemsHtml = folder.items && folder.items.length
            ? folder.items.map(f => renderFileItem(f)).join('')
            : `<div class="empty-state">Nenhuma imagem adicionada ainda.</div>`;
        renderTo(`
            <div class="project-view">
                <div class="project-header">
                    <h1 class="project-title">${folder.name}</h1>
                    <div class="project-meta">
                        <span style="font-size:12px; color:var(--text-faint); font-family:'Space Mono',monospace;">${proj.title}</span>
                    </div>
                </div>
                <p class="project-section-label">imagens</p>
                <div class="files-grid">${itemsHtml}</div>
            </div>`);
        bindFileItems(mainContent);
    }

    backBtn.addEventListener('click', () => {
        if (state.page === 'folder') openProject(state.projectId);
        else showHome();
    });

    function showStaticPage(key) {
        const pg = staticPages[key];
        state = { page: key, projectId: null, folderName: null };
        backBtn.style.display = 'none';
        setBreadcrumb([]);
        renderTo(`<div class="static-page"><h2>${pg.title}</h2>${pg.body}</div>`);
    }

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

    /* ─── Animação de digitação no logo ─── */
    (function typeLogo() {
        const text    = 'MineScript';
        const el      = document.getElementById('logo-text');
        const cursor  = document.querySelector('.logo-cursor');
        const bracket = document.getElementById('logo-close');
        let i = 0;

        const type = () => {
            if (i < text.length) {
                el.textContent += text[i++];
                setTimeout(type, 80);
            } else {
                bracket.style.display = 'inline';
                setTimeout(() => { cursor.style.display = 'none'; }, 2000);
            }
        };

        setTimeout(type, 300);
    })();

    showHome();

})();
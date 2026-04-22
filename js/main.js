/* ===== SHARED HEADER & FOOTER ===== */

function getBasePath() {
  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('.html')) {
    const parts = window.location.pathname.split('/').filter(Boolean);
    const htmlFile = parts[parts.length - 1]?.endsWith('.html') ? parts.length - 1 : parts.length;
    return htmlFile > 0 ? '../'.repeat(htmlFile) : './';
  }
  return depth > 0 ? '../'.repeat(depth) : './';
}

function buildHeader(activePage) {
  const base = getBasePath();
  const pages = [
    { name: 'Home', href: base },
    { name: 'About', href: base + 'about/' },
    { name: 'Services', href: base + 'services/' },
    { name: 'Clients', href: base + 'clients/' },
    { name: 'Recent Press', href: base + 'recent-press/' },
    { name: 'Holiday Cards', href: base + 'holiday-cards/' },
    { name: 'Contact', href: base + 'contact/' }
  ];

  const nav = pages.map(p =>
    `<li><a href="${p.href}"${p.name === activePage ? ' class="active"' : ''}>${p.name}</a></li>`
  ).join('');

  return `
  <header class="site-header">
    <div class="header-inner">
      <a href="${base}" class="logo">
        <img src="${base}images/logo.jpg" alt="JDS PR">
      </a>
      <nav class="main-nav" id="main-nav">
        <ul>${nav}</ul>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

function buildFooter() {
  const base = getBasePath();
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <nav class="footer-nav">
        <a href="${base}">Home</a>
        <a href="${base}about/">About</a>
        <a href="${base}services/">Services</a>
        <a href="${base}clients/">Clients</a>
        <a href="${base}recent-press/">Recent Press</a>
        <a href="${base}holiday-cards/">Holiday Cards</a>
        <a href="${base}contact/">Contact</a>
      </nav>
      <div class="footer-social">
        <a href="https://www.facebook.com/jay.d.schwartz" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://twitter.com/jds_pr" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://www.instagram.com/jaydschwartz" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
      </div>
      <p class="footer-copy">
        &copy; ${new Date().getFullYear()} JDSPR.COM All Rights Reserved.
        Website by <a href="https://castellamedia.com" target="_blank" rel="noopener">Castella Media Group</a>
      </p>
    </div>
  </footer>`;
}

function initSite(activePage) {
  // Insert header
  const headerEl = document.getElementById('site-header');
  if (headerEl) headerEl.outerHTML = buildHeader(activePage);

  // Insert footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.outerHTML = buildFooter();

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }

  // Back-to-top button
  const topBtn = document.createElement('button');
  topBtn.className = 'back-to-top';
  topBtn.innerHTML = '&uarr;';
  topBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(topBtn);
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('visible', window.scrollY > 400);
  });
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    faders.forEach(el => observer.observe(el));
  }
}

/* ===== PRESS RENDERING ===== */

async function loadPressData() {
  const base = getBasePath();
  const res = await fetch(base + 'data/press.json');
  const data = await res.json();
  data.sort((a, b) => new Date(b.date) - new Date(a.date));
  return data;
}

function clientsOf(article) {
  if (Array.isArray(article.clients) && article.clients.length) {
    return article.clients.map((name, i) => ({ name, slug: (article.clientSlugs && article.clientSlugs[i]) || '' }));
  }
  if (article.client) {
    return [{ name: article.client, slug: article.clientSlug || '' }];
  }
  return [];
}

function clientTagsHtml(article) {
  const base = getBasePath();
  return clientsOf(article)
    .map(c => `<span class="press-client"><a href="${base}clients/${c.slug}.html">${c.name}</a></span>`)
    .join(' ');
}

function renderPressCards(articles, container, limit) {
  const items = limit ? articles.slice(0, limit) : articles;
  container.innerHTML = items.map(a => `
    <div class="press-card">
      ${a.image ? `<a href="${a.url}" target="_blank" rel="noopener"><img src="${getBasePath() + a.image}" alt="${a.title}" loading="lazy"></a>` : `<a href="${a.url}" target="_blank" rel="noopener"><div class="press-placeholder"><img src="${getBasePath()}images/logo.jpg" alt="JDS PR"></div></a>`}
      <div class="press-card-body">
        <h3><a href="${a.url}" target="_blank" rel="noopener">${a.title}</a></h3>
        <div class="press-meta">${a.source} &middot; ${a.date}</div>
        ${clientTagsHtml(a)}
      </div>
    </div>
  `).join('');
}

/* Load press for a specific client on their profile page */
async function loadClientPress(clientSlug, containerId, limit) {
  const data = await loadPressData();
  const filtered = data.filter(a => clientsOf(a).some(c => c.slug === clientSlug));
  const container = document.getElementById(containerId);
  if (container && filtered.length) {
    renderPressCards(filtered, container, limit);
  }
}

/* Load all press on the Recent Press page with load-more */
async function loadAllPress(containerId, perPage) {
  const data = await loadPressData();
  const container = document.getElementById(containerId);
  const btn = document.getElementById('load-more');
  let shown = 0;

  function showMore() {
    const next = data.slice(shown, shown + perPage);
    const html = next.map(a => `
      <div class="press-card">
        ${a.image ? `<a href="${a.url}" target="_blank" rel="noopener"><img src="${getBasePath() + a.image}" alt="${a.title}" loading="lazy"></a>` : `<a href="${a.url}" target="_blank" rel="noopener"><div class="press-placeholder"><img src="${getBasePath()}images/logo.jpg" alt="JDS PR"></div></a>`}
        <div class="press-card-body">
          <h3><a href="${a.url}" target="_blank" rel="noopener">${a.title}</a></h3>
          <div class="press-meta">${a.source} &middot; ${a.date}</div>
          ${clientTagsHtml(a)}
        </div>
      </div>
    `).join('');
    container.insertAdjacentHTML('beforeend', html);
    shown += next.length;
    if (shown >= data.length && btn) btn.style.display = 'none';
  }

  showMore();
  if (btn) btn.addEventListener('click', showMore);
}

/* ===== LIGHTBOX ===== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const lbCaption = lightbox.querySelector('.lightbox-caption');

  document.querySelectorAll('.celebrity-gallery .gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('figcaption');
      lbImg.src = img.src;
      if (lbCaption && caption) lbCaption.textContent = caption.textContent;
      lightbox.classList.add('open');
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === closeBtn) {
      lightbox.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
}

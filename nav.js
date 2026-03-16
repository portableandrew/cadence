/* ============================================================
   Cadence — Navigation Component
   Injects sidebar (desktop) and bottom nav (mobile)
   ============================================================ */

(function () {
  const ICONS = {
    week:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    tasks:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    goals:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    checkin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>`,
    team:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    meetings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    actions: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
    admin:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    friday:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  };

  const NAV_ITEMS = [
    { href: 'wip.html',      label: 'This Week',       icon: 'week',     short: 'Week' },
    { href: 'checkin.html',  label: 'Friday Update',   icon: 'checkin',  short: 'Update' },
    { href: 'meetings.html', label: 'Meetings',        icon: 'meetings', short: 'Meetings' },
    { href: 'actions.html',  label: 'SLT Actions',     icon: 'actions',  short: 'Actions' },
    { href: 'team.html',     label: 'Team',            icon: 'team',     short: 'Team' },
    { href: 'admin.html',    label: 'Admin',           icon: 'admin',    short: 'Admin', adminOnly: true },
  ];

  function currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function isActive(item) {
    const page = currentPage();
    if (item.pages) return item.pages.includes(page);
    return item.href === page;
  }

  function buildSidebar() {
    const nav = document.createElement('nav');
    nav.className = 'sidebar';

    const items = NAV_ITEMS.map(item => {
      const active = isActive(item) ? 'active' : '';
      return `<a href="${item.href}" class="nav-item ${active}">
        ${ICONS[item.icon]}
        <span class="nav-label">${item.label}</span>
      </a>`;
    }).join('');

    nav.innerHTML = `
      <div class="sidebar-brand">
        <div class="brand-name">Cadence</div>
        <div class="brand-by">by Portable</div>
      </div>
      <div class="nav-group">
        ${items}
      </div>
      <div class="sidebar-footer">
        <div class="user-chip">
          <div class="avatar avatar-andrew">A</div>
          <div>
            <div class="name">Andrew</div>
            <div class="role">Admin</div>
          </div>
        </div>
      </div>
    `;
    return nav;
  }

  function buildBottomNav() {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';

    // Show all non-admin items in bottom nav
    const visibleItems = NAV_ITEMS.filter(i => !i.adminOnly);

    const items = visibleItems.map(item => {
      const active = isActive(item) ? 'active' : '';
      return `<a href="${item.href}" class="bottom-nav-item ${active}">
        ${ICONS[item.icon]}
        <span>${item.short}</span>
      </a>`;
    }).join('');

    nav.innerHTML = `<div class="bottom-nav-inner">${items}</div>`;
    return nav;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const app = document.querySelector('.app');
    if (!app) return;
    app.insertBefore(buildSidebar(), app.firstChild);
    document.body.appendChild(buildBottomNav());
  });

})();

/* ============================================================
   Shared UI helpers (used across all pages)
   ============================================================ */

// Tab switcher
function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector || '.tabs-container');
  if (!container) return;
  const buttons = container.querySelectorAll('.tab-btn');
  const panels  = container.querySelectorAll('.tab-panel');
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      if (panels[i]) panels[i].classList.add('active');
    });
  });
}

// Modal helpers
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

// Task status cycle: todo → progress → done → todo
function cycleStatus(btn) {
  const states = ['todo','progress','done'];
  const labels = ['To do','In progress','Done'];
  const cardClasses = ['','','done-card'];
  const current = states.findIndex(s => btn.classList.contains(s));
  const next = (current + 1) % 3;

  states.forEach(s => btn.classList.remove(s));
  btn.classList.add(states[next]);
  btn.title = labels[next];

  const card = btn.closest('.task-card');
  if (card) {
    cardClasses.forEach(c => { if (c) card.classList.remove(c); });
    if (cardClasses[next]) card.classList.add(cardClasses[next]);
  }

  // Update status badge if present
  const badge = btn.nextElementSibling?.querySelector?.('.status-badge') ||
                btn.closest('.task-card')?.querySelector('.status-badge');
  if (badge) {
    badge.className = 'status-badge';
    const badgeClasses = ['status-todo','status-progress','status-done'];
    badge.classList.add(badgeClasses[next]);
    badge.innerHTML = `<span class="status-dot ${states[next]}"></span> ${labels[next]}`;
  }
}

// Review toggle
function toggleReview(btn) {
  btn.classList.toggle('done');
  const pip = btn.querySelector('.toggle-pip');
  if (btn.classList.contains('done')) {
    btn.innerHTML = `<span class="toggle-pip"></span> ✓ Reviewed`;
    btn.querySelector('.toggle-pip').style.background = '#4ade80';
  } else {
    const name = btn.dataset.name || 'person';
    btn.innerHTML = `<span class="toggle-pip"></span> Review with ${name}`;
  }
}

// Add task inline form
function toggleAddTask(btn) {
  const form = btn.nextElementSibling;
  if (!form) return;
  const visible = form.classList.toggle('visible');
  btn.style.display = visible ? 'none' : 'inline-flex';
  if (visible) form.querySelector('input')?.focus();
}

function cancelAddTask(btn) {
  const form = btn.closest('.add-task-form');
  if (!form) return;
  form.classList.remove('visible');
  const addBtn = form.previousElementSibling;
  if (addBtn) addBtn.style.display = 'inline-flex';
  form.querySelector('input[type="text"]').value = '';
}

// Checkin accordion
function toggleCheckin(header) {
  const body = header.nextElementSibling;
  const chevron = header.querySelector('.chevron');
  if (!body) return;
  const expanded = body.classList.toggle('expanded');
  if (chevron) chevron.classList.toggle('open', expanded);
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

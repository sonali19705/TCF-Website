fetch('/content/team/index.json')
  .then(res => {
    if (!res.ok) throw new Error('Members JSON not found');
    return res.json();
  })
  .then(members => {
    const grid = document.getElementById('teamGrid');
    if (!grid) return;

    // If CMS has no members yet → show nothing safely
    if (!Array.isArray(members) || members.length === 0) {
      console.log('No team members yet (CMS empty)');
      return;
    }

    grid.innerHTML = ''; // clear container

    members.forEach(member => {
      const card = document.createElement('div');
      card.className = 'team-card';

      card.innerHTML = `
        <img src="${member.image || ''}" alt="${member.name || ''}" class="team-avatar" />

        <h3 class="section-title">${member.name || ''}</h3>
        <p class="member-role">${member.role || ''}</p>

        <div class="member-socials">
          ${
            member.instagram
              ? `<a href="${member.instagram}" class="member-social" target="_blank" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="18" cy="6" r="1"/>
                  </svg>
                </a>`
              : ''
          }

          ${
            member.linkedin
              ? `<a href="${member.linkedin}" class="member-social" target="_blank" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="4"/>
                    <line x1="7" y1="10" x2="7" y2="17"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                    <path d="M11 17v-4a2 2 0 0 1 4 0v4"/>
                  </svg>
                </a>`
              : ''
          }
        </div>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.warn('Members not rendered yet:', err.message);
  });

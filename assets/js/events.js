fetch('/content/events/index.json')
  .then(res => {
    if (!res.ok) throw new Error('Events JSON not found');
    return res.json();
  })
  .then(data => {
    const upcomingGrid = document.getElementById('upcomingEventsGrid');
    const pastGrid = document.getElementById('pastEventsGrid');

    if (!upcomingGrid || !pastGrid) return;

    const events = data.items || [];
    if (!events.length) return;

    upcomingGrid.innerHTML = '';
    pastGrid.innerHTML = '';

    events.forEach(event => {
      const card = document.createElement('article');
      card.className = 'announcement-card event-card';

      card.innerHTML = `
        ${event.cover_image ? `
          <img
            src="${event.cover_image}"
            alt="${event.title || ''}"
            class="event-cover"
          />` : ''}

        <h3 class="section-title">${event.title || ''}</h3>

        <p class="section-desc">
          ${event.excerpt || ''}
        </p>

        <p class="event-meta">
          ${event.location || ''}
          ${event.date ? ' · ' + new Date(event.date).toLocaleDateString() : ''}
        </p>

        <div class="event-actions">
          ${event.registration_link ? `
            <a href="${event.registration_link}"
               class="btn btn-outline"
               target="_blank"
               rel="noopener">
              Register
            </a>` : ''}

          <span class="event-type">${event.event_type}</span>
        </div>
      `;

      if (event.event_type === 'Upcoming') {
        upcomingGrid.appendChild(card);
      } else {
        pastGrid.appendChild(card);
      }
    });
  })
  .catch(err => {
    console.warn('Events not rendered:', err.message);
  });

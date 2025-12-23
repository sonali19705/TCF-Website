fetch('/content/events/index.json')
  .then(res => {
    if (!res.ok) throw new Error('Events JSON not found');
    return res.json();
  })
  .then(data => {
    const grid = document.getElementById('eventsGrid');
    if (!grid) return;

    const events = data.items || [];

    // CMS empty → safe exit
    if (!Array.isArray(events) || events.length === 0) {
      console.log('No events yet (CMS empty)');
      return;
    }

    grid.innerHTML = '';

    events.forEach(event => {
      const card = document.createElement('article');
      card.className = 'announcement-card event-card';

      card.innerHTML = `
        ${
          event.cover_image
            ? `<img
                 src="${event.cover_image}"
                 alt="${event.title || ''}"
                 class="event-cover"
               />`
            : ''
        }

        <h3 class="section-title">${event.title || ''}</h3>

        <p class="section-desc">
          ${event.excerpt || ''}
        </p>

        <p class="event-meta">
          ${event.location || ''}
          ${
            event.date
              ? ' · ' + new Date(event.date).toLocaleDateString()
              : ''
          }
        </p>

        <div class="event-actions">
          ${
            event.registration_link
              ? `<a href="${event.registration_link}"
                   class="btn btn-outline"
                   target="_blank"
                   rel="noopener">
                   Register
                 </a>`
              : ''
          }

          ${
            event.event_type
              ? `<span class="event-type">${event.event_type}</span>`
              : ''
          }
        </div>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.warn('Events not rendered yet:', err.message);
  });

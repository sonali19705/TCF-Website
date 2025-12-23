fetch('/content/gallery/index.json')
  .then(res => {
    if (!res.ok) throw new Error('Gallery JSON not found');
    return res.json();
  })
  .then(data => {
    const grid = document.getElementById('galleryEvents');
    if (!grid) return;

    const events = data.events || [];

    // CMS empty → safe exit
    if (!Array.isArray(events) || events.length === 0) {
      console.log('No gallery events yet (CMS empty)');
      return;
    }

    grid.innerHTML = '';

    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'announcement-card gallery-event-card';

      card.innerHTML = `
        <div class="gallery-event-cover">
          <img src="${event.cover || ''}" alt="${event.event || ''}">
          <div class="gallery-event-overlay">
            <span>View Photos</span>
          </div>
        </div>

        <h3 class="section-title">${event.event || ''}</h3>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.warn('Gallery not rendered yet:', err.message);
  });

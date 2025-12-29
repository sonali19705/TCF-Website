fetch('/content/gallery/index.json')
  .then(res => {
    if (!res.ok) throw new Error('Gallery JSON not found');
    return res.json();
  })
  .then(data => {
    const grid = document.getElementById('galleryEvents');
    if (!grid) return;

    const events = data.items || [];

    if (!events.length) {
      console.log('No gallery events yet (CMS empty)');
      return;
    }

    grid.innerHTML = '';

    events.forEach(event => {
      // ✅ Use first photo as cover image
      const coverImage =
        event.photos && event.photos.length > 0
          ? event.photos[0].image
          : '';

      const card = document.createElement('div');
      card.className = 'announcement-card gallery-event-card';

      card.innerHTML = `
        <div class="gallery-event-cover">
          ${
            coverImage
              ? `<img src="${coverImage}" alt="${event.event || ''}">`
              : `<div class="gallery-placeholder">No Image</div>`
          }
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

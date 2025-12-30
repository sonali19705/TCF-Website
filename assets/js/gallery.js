fetch('/content/gallery/index.json')
  .then(res => {
    if (!res.ok) throw new Error('Gallery JSON not found');
    return res.json();
  })
  .then(data => {
    const grid = document.getElementById('galleryEvents');
    const modal = document.getElementById('galleryModal');
    const modalImages = document.getElementById('galleryModalImages');
    const modalTitle = document.getElementById('galleryModalTitle');

    if (!grid) return;

    const events = data.items || [];
    if (!events.length) return;

    grid.innerHTML = '';

    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'announcement-card gallery-event-card';

      card.innerHTML = `
        <div class="gallery-event-cover">
          <img src="${event.cover}" alt="${event.event}">
          <div class="gallery-event-overlay">
            <span>View Photos</span>
          </div>
        </div>
        <h3 class="section-title">${event.event}</h3>
      `;

      // 👉 Click = open modal with all photos
      card.addEventListener('click', () => {
        modalTitle.textContent = event.event;
        modalImages.innerHTML = '';

        event.photos.forEach(p => {
          const img = document.createElement('img');
          img.src = p.image;
          img.className = 'gallery-modal-img';
          modalImages.appendChild(img);
        });

        modal.classList.add('open');
      });

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.warn('Gallery not rendered:', err.message);
  });

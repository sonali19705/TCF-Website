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

    // Fullscreen viewer
    const viewer = document.getElementById('imageViewer');
    const viewerImg = document.getElementById('imageViewerImg');
    const viewerClose = document.querySelector('.image-viewer-close');

    if (!grid || !modal || !modalImages || !modalTitle) return;

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

      // 👉 Click event card → open modal
      card.addEventListener('click', () => {
        modalTitle.textContent = event.event;
        modalImages.innerHTML = '';

        event.photos.forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          img.className = 'gallery-modal-img';

          // 👉 Click image → fullscreen zoom
          img.addEventListener('click', () => {
            viewerImg.src = src;
            viewer.classList.remove('hidden');
          });

          modalImages.appendChild(img);
        });

        modal.classList.add('open');
      });

      grid.appendChild(card);
    });

    // ❌ Close fullscreen viewer
    if (viewer && viewerClose) {
      viewerClose.addEventListener('click', () => {
        viewer.classList.add('hidden');
      });

      viewer.addEventListener('click', e => {
        if (e.target === viewer) {
          viewer.classList.add('hidden');
        }
      });
    }
  })
  .catch(err => {
    console.warn('Gallery not rendered:', err.message);
  });

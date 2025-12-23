fetch('/content/magazines/index.json')
  .then(res => {
    if (!res.ok) throw new Error('Magazines JSON not found');
    return res.json();
  })
  .then(data => {
    const grid = document.getElementById('magazinesGrid');
    if (!grid) return;

    const magazines = data.magazines || [];

    // CMS empty → safe exit
    if (!Array.isArray(magazines) || magazines.length === 0) {
      console.log('No magazines yet (CMS empty)');
      return;
    }

    grid.innerHTML = '';

    magazines.forEach(item => {
      const card = document.createElement('article');
      card.className = 'announcement-card';

      card.innerHTML = `
        <img
          src="${item.cover_image || ''}"
          alt="${item.title || ''}"
          class="magazine-cover"
        />

        <h3 class="section-title">${item.title || ''}</h3>
        <p class="section-desc">${item.year || ''}</p>

        ${
          item.pdf_file
            ? `<a href="${item.pdf_file}"
                 class="btn btn-outline"
                 target="_blank"
                 rel="noopener">
                 Download PDF
               </a>`
            : ''
        }
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.warn('Magazines not rendered yet:', err.message);
  });

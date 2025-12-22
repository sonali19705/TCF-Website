fetch('/content/resources/index.json')
  .then(res => {
    if (!res.ok) throw new Error('Resources JSON not found');
    return res.json();
  })
  .then(resources => {
    const grid = document.getElementById('resourcesGrid');
    if (!grid) return;

    // CMS empty → safe exit
    if (!Array.isArray(resources) || resources.length === 0) {
      console.log('No resources yet (CMS empty)');
      return;
    }

    grid.innerHTML = '';

    resources.forEach(item => {
      const card = document.createElement('div');
      card.className = 'announcement-card';

      card.innerHTML = `
        <h3 class="section-title">${item.title || ''}</h3>
        <p class="section-desc">${item.excerpt || ''}</p>

        <a href="${item.link || '#'}"
           class="btn btn-outline"
           target="_blank"
           rel="noopener">
           View ${item.category || 'Resource'}
        </a>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.warn('Resources not rendered yet:', err.message);
  });

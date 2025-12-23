fetch('/content/blog/index.json')
  .then(res => {
    if (!res.ok) throw new Error('Blog JSON not found');
    return res.json();
  })
  .then(data => {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    const posts = data.posts || [];

    // CMS empty → safe exit
    if (!Array.isArray(posts) || posts.length === 0) {
      console.log('No blog posts yet (CMS empty)');
      return;
    }

    grid.innerHTML = '';

    posts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'announcement-card';

      card.innerHTML = `
        ${
          post.cover_image
            ? `<img
                 src="${post.cover_image}"
                 alt="${post.title || ''}"
                 class="blog-cover"
               />`
            : ''
        }

        <h3 class="section-title">${post.title || ''}</h3>

        <p class="section-desc">
          ${post.excerpt || ''}
        </p>

        <p class="blog-meta">
          ${post.author || ''} · ${
            post.date
              ? new Date(post.date).toLocaleDateString()
              : ''
          }
        </p>

        ${
          post.body
            ? `<a href="#"
                 class="btn btn-outline"
                 onclick="alert('Blog detail page coming soon')">
                 Read More
               </a>`
            : ''
        }
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.warn('Blog not rendered yet:', err.message);
  });

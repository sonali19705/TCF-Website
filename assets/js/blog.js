fetch('/content/blog/index.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    const posts = data.items || [];

    if (!posts.length) {
      console.log('No blog posts yet (CMS empty)');
      return;
    }

    grid.innerHTML = '';

    posts.forEach(post => {
      grid.innerHTML += `
        <article class="announcement-card">
          ${post.cover_image ? `<img src="${post.cover_image}" class="blog-cover">` : ''}
          <h3 class="section-title">${post.title}</h3>
          <p class="section-desc">${post.excerpt}</p>
          <p class="blog-meta">
            ${post.author} · ${new Date(post.date).toLocaleDateString()}
          </p>
        </article>
      `;
    });
  });

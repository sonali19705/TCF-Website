fetch('/content/events/index.json')
  .then(res => res.json())
  .then(data => {
    const upcomingGrid = document.getElementById('upcomingEventsGrid');
    const pastGrid = document.getElementById('pastEventsGrid');

    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('eventModalTitle');
    const modalBody = document.getElementById('eventModalBody');
    const modalClose = document.getElementById('eventModalClose');

    const events = data.items || [];
    if (!events.length) return;

    upcomingGrid.innerHTML = '';
    pastGrid.innerHTML = '';

    events.forEach(event => {
      const card = document.createElement('article');
      card.className = 'announcement-card event-card';

      // ✅ CARD = minimal info only
      card.innerHTML = `
        <div class="event-cover-wrap">
          <img src="${event.cover_image}" class="event-cover" />
        </div>

        <h3 class="section-title">${event.title}</h3>

        <button class="btn btn-outline view-event-btn">
          View Details
        </button>
      `;

      // ✅ CLICK → OPEN MODAL
      card.querySelector('.view-event-btn').addEventListener('click', () => {
        modalTitle.textContent = event.title;

        modalBody.innerHTML = `
          <p class="section-desc">${event.excerpt || ''}</p>

          <p class="event-meta">
            <strong>Location:</strong> ${event.location || '—'}<br>
            <strong>Date:</strong> ${event.date ? new Date(event.date).toLocaleDateString() : '—'}
          </p>

          ${event.registration_link ? `
            <a href="${event.registration_link}" target="_blank" class="btn btn-primary">
              Register
            </a>
          ` : ''}
        `;

        modal.classList.add('open');
      });

      if (event.event_type === 'Upcoming') {
        upcomingGrid.appendChild(card);
      } else {
        pastGrid.appendChild(card);
      }
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  })
  .catch(err => console.warn(err));

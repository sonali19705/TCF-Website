// main.js — small interactions (no dependencies)

// Smooth scroll for anchor links
document.addEventListener('click', function(e){
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if(target){
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  }
});

// Simple lightbox for images with data-lightbox attribute
document.addEventListener('click', function(e){
  const el = e.target.closest('[data-lightbox]');
  if(!el) return;
  const src = el.getAttribute('data-lightbox') || el.src;
  // create modal
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999';
  modal.innerHTML = '<img src="'+src+'" style="max-width:90%;max-height:90%;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,0.5)"><button aria-label="close" style="position:absolute;top:18px;right:18px;background:#fff;padding:6px 8px;border-radius:6px">✕</button>';
  modal.querySelector('button').addEventListener('click', ()=> modal.remove());
  modal.addEventListener('click', (ev)=> { if(ev.target === modal) modal.remove(); });
  document.body.appendChild(modal);
});

// Lazy-load images (native)
document.addEventListener('DOMContentLoaded', function(){
  const imgs = document.querySelectorAll('img[data-src]');
  imgs.forEach(img => {
    img.setAttribute('loading', 'lazy');
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
});

// Simple contact form validation (add id="contact-form")
document.addEventListener('submit', function(e){
  const form = e.target;
  if(form.id !== 'contact-form') return;
  e.preventDefault();
  const name = form.querySelector('[name=name]').value.trim();
  const email = form.querySelector('[name=email]').value.trim();
  const msg = form.querySelector('[name=message]').value.trim();
  if(!name || !email || !msg){ alert('Please fill all fields.'); return; }
  // basic email check
  if(!/^\S+@\S+\.\S+$/.test(email)){ alert('Enter a valid email.'); return; }
  // replace with real submission later (Formspree or Netlify Forms)
  alert('Thanks! Message sent (demo).');
  form.reset();
});

//canvas
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let scrollOffset = 0;

  const particleCount = window.innerWidth < 768 ? 40 : 80;

  function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("scroll", () => {
    scrollOffset = window.scrollY * 0.15;
  });

  resizeCanvas();

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2.5 + 1.5
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      const y = p.y + scrollOffset * 0.05;

      ctx.beginPath();
      ctx.arc(p.x, y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(92, 198, 200, 0.9)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const y2 = p2.y + scrollOffset * 0.05;
        const dist = Math.hypot(p.x - p2.x, y - y2);

        if (dist < 150) {
          ctx.strokeStyle = "rgba(92, 198, 200, 0.22)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, y);
          ctx.lineTo(p2.x, y2);
          ctx.stroke();
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
      if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;
    });

    requestAnimationFrame(animate);
  }

  createParticles();
  animate();
});

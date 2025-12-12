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

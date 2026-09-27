(function () {
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // mobil menü
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var scrim = null;
  function closeMenu() {
    nav.classList.remove('open'); burger.classList.remove('on');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (scrim) { scrim.remove(); scrim = null; }
  }
  function openMenu() {
    nav.classList.add('open'); burger.classList.add('on');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    scrim = document.createElement('div');
    scrim.className = 'scrim';
    scrim.addEventListener('click', closeMenu);
    document.body.appendChild(scrim);
  }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.contains('open') ? closeMenu() : openMenu();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) closeMenu(); });
  }

  // teklif formu -> WhatsApp
  var form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var msg = 'Merhaba, hurda satmak istiyorum.%0A' +
        'Ad: ' + encodeURIComponent(d.get('ad')) + '%0A' +
        'Telefon: ' + encodeURIComponent(d.get('tel')) + '%0A' +
        'Bölge: ' + encodeURIComponent(d.get('bolge')) + '%0A' +
        'Hurda: ' + encodeURIComponent(d.get('not') || '');
      window.open('https://wa.me/905378847851?text=' + msg, '_blank', 'noopener');
    });
  }

  // çerez bandı
  var c = document.getElementById('cookie');
  if (c) {
    var v = null;
    try { v = localStorage.getItem('kardeslerCerez'); } catch (e) {}
    if (!v) c.hidden = false;
    function set(val) { try { localStorage.setItem('kardeslerCerez', val); } catch (e) {} c.hidden = true; }
    document.getElementById('cookie-ok').addEventListener('click', function () { set('1'); });
    document.getElementById('cookie-no').addEventListener('click', function () { set('0'); });
  }
})();

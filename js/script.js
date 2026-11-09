document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const pageName = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const pageClassMap = {
    'webdesign.html': 'page--webdesign',
    'seo.html': 'page--seo',
    'betreuung.html': 'page--betreuung',
    'domain-hosting.html': 'page--hosting',
    'leistungen.html': 'page--leistungen',
    'ueber-uns.html': 'page--about',
    'kontakt.html': 'page--contact',
    'referenzen.html': 'page--references'
  };
  if (pageClassMap[pageName]) document.body.classList.add(pageClassMap[pageName]);
  const closeMenu = () => {
    navLinks?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Menü öffnen');
    document.body.classList.remove('menu-open');
  };

  let previousScrollY = Math.max(0, window.scrollY);
  const updateHeader = () => {
    const scrollY = Math.max(0, window.scrollY);
    header?.classList.toggle('is-scrolled', scrollY > 12);
    const navigationInUse =
      navLinks?.classList.contains('is-open') ||
      header?.querySelector(':focus-visible, .has-submenu.open');
    if (scrollY < previousScrollY || scrollY <= (header?.offsetHeight || 82) || navigationInUse) {
      header?.classList.remove('is-hidden');
    } else if (scrollY > previousScrollY) {
      header?.classList.add('is-hidden');
    }
    previousScrollY = scrollY;
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  header?.addEventListener('focusin', () => header.classList.remove('is-hidden'));

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    document.body.classList.toggle('menu-open', isOpen);
    header?.classList.remove('is-hidden');
  });

  document.querySelectorAll('.has-submenu > button').forEach((button, index) => {
    const menu = button.nextElementSibling;
    if (!menu?.id) menu.id = `service-menu-${index + 1}`;
    button.setAttribute('aria-controls', menu.id);
    button.setAttribute('aria-expanded', 'false');
    const activeLink = [...menu.querySelectorAll('a')].find((link) => {
      const linkPage = new URL(link.href, window.location.href).pathname
        .split('/')
        .filter(Boolean)
        .pop();
      return linkPage === pageName;
    });
    if (activeLink) {
      activeLink.classList.add('active');
      activeLink.setAttribute('aria-current', 'page');
      button.parentElement?.classList.add('is-current-section');
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      const parent = button.parentElement;
      const opened = parent.classList.toggle('open');
      button.setAttribute('aria-expanded', String(opened));
    });
  });

  document
    .querySelectorAll('.nav-links a')
    .forEach((link) => link.addEventListener('click', closeMenu));
  window.matchMedia('(min-width: 851px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      document.querySelectorAll('.has-submenu.open').forEach((item) => {
        item.classList.remove('open');
        item.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Mobile reading rhythm: native disclosures, fully expanded without JavaScript.
  // Reuse the same content and restore the original DOM on larger screens.
  const readingViewport = window.matchMedia('(max-width: 600px)');
  const readingCards = [
    ...document.querySelectorAll('.offer-card, .process-step, .process-premium__rail > li')
  ];
  const readingStates = new Map();
  const updateReadingCards = () => {
    readingCards.forEach((card) => {
      if (readingViewport.matches && !readingStates.has(card)) {
        const heading = card.querySelector(':scope > h3');
        const paragraphs = [...card.querySelectorAll(':scope > p')];
        if (!heading || !paragraphs.length) return;
        const originalNodes = [...card.childNodes];
        const disclosure = document.createElement('details');
        disclosure.className = 'mobile-disclosure';
        const summary = document.createElement('summary');
        const content = document.createElement('div');
        content.className = 'mobile-disclosure__content';
        card.insertBefore(disclosure, heading);
        summary.append(heading);
        content.append(...paragraphs);
        disclosure.append(summary, content);
        card.classList.add('has-mobile-disclosure');
        readingStates.set(card, originalNodes);
      } else if (!readingViewport.matches && readingStates.has(card)) {
        card.replaceChildren(...readingStates.get(card));
        card.classList.remove('has-mobile-disclosure');
        readingStates.delete(card);
      }
    });
  };
  updateReadingCards();
  readingViewport.addEventListener('change', updateReadingCards);

  // Inhalte bleiben ohne JavaScript und bei reduzierter Bewegung sofort sichtbar.
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const entryTargets = [
    ...new Set([
      ...document.querySelectorAll('.reveal'),
      ...document.querySelectorAll('.process-premium__rail > li, .process-step')
    ])
  ];
  const motionSteps = [...document.querySelectorAll('.process-premium__rail > li, .process-step')];
  motionSteps.forEach((step, index) => {
    step.classList.add('motion-step');
    step.style.setProperty('--enter-delay', `${(index % 5) * 0.075}s`);
  });
  if (!motionPreference.matches && 'IntersectionObserver' in window) {
    const entryObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    entryTargets.forEach((element) => {
      element.classList.add('motion-enter');
      entryObserver.observe(element);
    });
    document.body.classList.add('motion-enhanced');
  } else {
    entryTargets.forEach((element) => element.classList.add('is-in-view'));
  }
  const heroSection = document.querySelector('.hero-showcase');
  if (heroSection && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle('is-motion-visible', entry.isIntersecting)
      );
    }).observe(heroSection);
  }
  const magneticButtons = [...document.querySelectorAll('.button, .nav-cta')];
  const resetMagnetics = () =>
    magneticButtons.forEach((button) => {
      button.style.removeProperty('--magnet-x');
      button.style.removeProperty('--magnet-y');
    });
  const updateMotionPreference = () => {
    document.body.classList.toggle('motion-reduced', motionPreference.matches);
    if (motionPreference.matches) {
      resetMagnetics();
      entryTargets.forEach((element) => element.classList.add('is-in-view'));
    }
  };
  updateMotionPreference();
  motionPreference.addEventListener('change', updateMotionPreference);
  magneticButtons.forEach((button) => {
    let bounds;
    button.addEventListener('pointerenter', () => {
      bounds = button.getBoundingClientRect();
    });
    button.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || motionPreference.matches) return;
      bounds ||= button.getBoundingClientRect();
      const x = Math.max(-6, Math.min(6, (event.clientX - bounds.left - bounds.width / 2) * 0.07));
      const y = Math.max(-4, Math.min(4, (event.clientY - bounds.top - bounds.height / 2) * 0.1));
      button.style.setProperty('--magnet-x', `${x.toFixed(2)}px`);
      button.style.setProperty('--magnet-y', `${y.toFixed(2)}px`);
    });
    const resetButton = () => {
      bounds = null;
      button.style.removeProperty('--magnet-x');
      button.style.removeProperty('--magnet-y');
    };
    button.addEventListener('pointerleave', resetButton);
    button.addEventListener('focus', resetButton);
  });

  document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('motion-idle', document.hidden);
  });

  // A deliberate click opens the information; only its link visits the website.
  document.querySelectorAll('[data-project-flip]').forEach((card) => {
    const openButton = card.querySelector('.project-flip__open');
    const returnButton = card.querySelector('.project-flip__return');
    const front = card.querySelector('.project-flip__front');
    const back = card.querySelector('.project-flip__back');
    const show = (open, moveFocus = true) => {
      card.classList.toggle('is-flipped', open);
      openButton.setAttribute('aria-expanded', String(open));
      front.inert = open;
      back.inert = !open;
      front.setAttribute('aria-hidden', String(open));
      back.setAttribute('aria-hidden', String(!open));
      if (moveFocus) (open ? back.querySelector('h3') : openButton).focus({ preventScroll: true });
    };
    show(false, false);
    openButton.addEventListener('click', () => show(true));
    returnButton.addEventListener('click', () => show(false));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && card.classList.contains('is-flipped')) show(false);
    });
  });

  // Remember acknowledgement across all pages until the visitor resets it.
  const privacyKey = 'leinaro-privacy-notice-v2';
  let privacyPreference = null;
  try {
    // Remove the former preference, which had no expiry or separate storage choice.
    window.localStorage.removeItem('leitwerk-cookie-note');
    privacyPreference = window.localStorage.getItem(privacyKey) === 'acknowledged';
  } catch { /* The notice remains usable when browser storage is unavailable. */ }
  const consent = document.querySelector('.cookie-banner') || document.createElement('dialog');
  consent.className = 'cookie-banner';
  consent.hidden = true;
  consent.setAttribute('aria-labelledby', 'cookie-note-title');
  consent.setAttribute('aria-describedby', 'cookie-note-description');
  consent.innerHTML = '<div class="cookie-banner__content"><span class="cookie-banner__eyebrow">Ihre Privatsphäre</span><h2 id="cookie-note-title" tabindex="-1" autofocus>Datenschutz.<br /><em>Kurz erklärt.</em></h2><p id="cookie-note-description">Diese Website nutzt keine Analyse- oder Marketing-Cookies. Formulardaten werden erst beim Absenden an Web3Forms übermittelt.</p><p class="cookie-banner__storage-info">Mit „Verstanden“ speichern wir ausschließlich, dass Sie diesen Hinweis bestätigt haben. Er bleibt dann auf allen Unterseiten ausgeblendet, bis Sie die Auswahl zurücksetzen oder Ihre Browserdaten löschen.</p><p class="cookie-banner__status" role="status" hidden></p><div class="cookie-banner__actions"><button class="button" type="button" data-privacy-accept>Verstanden</button><button class="cookie-banner__withdraw" type="button" data-privacy-withdraw hidden>Gespeicherte Auswahl löschen</button><a href="datenschutz.html">Datenschutz lesen</a></div></div>';
  document.body.append(consent);
  const status = consent.querySelector('.cookie-banner__status');
  const withdraw = consent.querySelector('[data-privacy-withdraw]');
  const closeNotice = () => {
    if (consent.open) consent.close();
    consent.hidden = true;
    document.body.classList.remove('cookie-note-open');
  };
  const showNotice = () => {
    status.hidden = true;
    withdraw.hidden = !privacyPreference;
    consent.hidden = false;
    document.body.classList.add('cookie-note-open');
    if (!consent.open) consent.showModal();
  };
  consent.querySelector('[data-privacy-accept]').addEventListener('click', () => {
    try {
      window.localStorage.setItem(privacyKey, 'acknowledged');
      window.localStorage.removeItem('leinaro-privacy-notice-v1');
      privacyPreference = true;
    } catch { /* Closing remains possible if the browser blocks storage. */ }
    closeNotice();
  });
  withdraw.addEventListener('click', () => {
    try { window.localStorage.removeItem(privacyKey); }
    catch { status.textContent = 'Bitte löschen Sie die Website-Daten in Ihren Browser-Einstellungen.'; status.hidden = false; return; }
    privacyPreference = null;
    withdraw.hidden = true;
    status.textContent = 'Ihre gespeicherte Auswahl wurde gelöscht.';
    status.hidden = false;
    closeNotice();
  });
  consent.addEventListener('cancel', (event) => { event.preventDefault(); closeNotice(); });
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'privacy-settings';
  settings.textContent = 'Datenschutz-Einstellungen';
  settings.setAttribute('aria-haspopup', 'dialog');
  settings.addEventListener('click', showNotice);
  document.querySelector('.footer-bottom > div')?.append(settings);
  if (!['datenschutz.html', 'impressum.html'].includes(pageName) && !privacyPreference) showNotice();
});

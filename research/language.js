// Shared across the homepage's research gallery and all research stories.
window.SiteLanguage = {
  get() {
    const requested = new URLSearchParams(location.search).get('lang');
    if (requested === 'en' || requested === 'zh') return requested;
    try {
      const saved = localStorage.getItem('yixin-lang');
      if (saved === 'en' || saved === 'zh') return saved;
    } catch (_) {}
    return 'en';
  },
  set(lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    try { localStorage.setItem('yixin-lang', lang); } catch (_) {}
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
};

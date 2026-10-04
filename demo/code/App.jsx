import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { LiveStrip, RouteGrid } from './components/Home';
import RouteDetail from './components/RouteDetail';
import Terminals from './components/Terminals';
import Footer from './components/Footer';
import { searchRoutes, routes } from './lib/data';
import { LangProvider, useLang } from './lib/i18n.jsx';
import { getFavs } from './lib/favs';

function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  if (h.startsWith('r/')) return { view: 'route', id: h.slice(2) };
  if (h === 'terminalet') return { view: 'terminals' };
  if (h === 'te-miat') return { view: 'mine' };
  return { view: 'home' };
}

function Mine() {
  const { t } = useLang();
  const favs = getFavs();
  const list = routes.filter((r) => favs.includes(r.id));
  return (
    <div className="wrap" style={{ paddingTop: 40, minHeight: '50vh' }}>
      <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(30px,5vw,46px)', textTransform: 'uppercase', margin: '0 0 20px' }}>
        ♥ {t('fav.title')}
      </h1>
      {list.length ? (
        <RouteGrid list={list} />
      ) : (
        <div className="empty" style={{ border: '2px dashed var(--line)', borderRadius: 18 }}>
          <b>{t('fav.empty')}</b>
          {t('fav.emptySub')}
        </div>
      )}
    </div>
  );
}

function Shell() {
  const [route, setRoute] = useState(parseHash);
  const [q, setQ] = useState('');

  useEffect(() => {
    const onH = () => { setRoute(parseHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onH);
    return () => window.removeEventListener('hashchange', onH);
  }, []);

  return (
    <>
      <Header view={route.view} />
      {route.view === 'home' && (
        <main>
          <Hero q={q} setQ={setQ} />
          {!q.trim() && <LiveStrip />}
          <RouteGrid list={searchRoutes(q)} />
        </main>
      )}
      {route.view === 'route' && <main><RouteDetail id={route.id} /></main>}
      {route.view === 'terminals' && <main><Terminals /></main>}
      {route.view === 'mine' && <main><Mine /></main>}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  );
}

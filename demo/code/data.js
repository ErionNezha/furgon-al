import raw from '../../research/schedules.json';

const routesRaw = raw.routes || raw;

export const norm = (s = '') =>
  s.toLowerCase().replace(/ë/g, 'e').replace(/ç/g, 'c');

export const slug = (s = '') =>
  norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Emra miqësorë shqip (+ anglisht) për terminalet (të dhënat vijnë me emra të përzier EN) */
export function terminaliFriendly(t = {}) {
  const emri = t.emri || '';
  const hasSN = /south and north/i.test(emri);
  const hasEast = /east/i.test(emri);
  if (/i_paverifikuar/i.test(emri))
    return { emri: 'Terminali po verifikohet', emri_en: 'Terminal being verified', zona: '', zona_en: '', adresa: '', mapsQuery: null, ok: false };
  if (hasSN && hasEast)
    return { emri: 'Terminali Jugor–Verior / Lindor', emri_en: 'South–North / East Terminal', zona: 'Kthesa e Kamzës / Qyteti Studenti', zona_en: 'Kamza Overpass / Student City', adresa: 'Tiranë', mapsQuery: 'Kthesa e Kamzës, Tiranë', ok: true };
  if (hasSN)
    return { emri: 'Terminali Jugor–Verior', emri_en: 'South–North Terminal', zona: t.zona || 'Kthesa e Kamzës', zona_en: 'Kamza Overpass', adresa: t.adresa || 'Pranë mbikalimit të Kamzës, Tiranë', mapsQuery: 'Terminali i Autobusëve, Kthesa e Kamzës, Tiranë', ok: true };
  if (hasEast)
    return { emri: 'Terminali Lindor', emri_en: 'East Terminal', zona: 'Qyteti Studenti', zona_en: 'Student City', adresa: 'Rr. Arben Broci, Qyteti Studenti, Tiranë', mapsQuery: 'Rruga Arben Broci, Qyteti Studenti, Tiranë', ok: true };
  if (/garibaldi/i.test(emri))
    return { emri: 'Sheshi Garibaldi', emri_en: 'Garibaldi Square', zona: 'Qendër', zona_en: 'Center', adresa: 'Sheshi Garibaldi, Tiranë', mapsQuery: 'Sheshi Garibaldi, Tiranë', ok: true };
  if (/opera|muze/i.test(emri))
    return { emri: 'Te Pallati i Operas', emri_en: 'At the Opera Palace', zona: 'Qendër', zona_en: 'Center', adresa: 'Zona e Muzeut Kombëtar, Tiranë', mapsQuery: 'Pallati i Operas, Tiranë', ok: true };
  return { emri, emri_en: emri, zona: t.zona || '', zona_en: t.zona || '', adresa: t.adresa || '', mapsQuery: emri ? `${emri}, Tiranë` : null, ok: true };
}

export const mapsDirUrl = (term) =>
  term.mapsQuery ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(term.mapsQuery)}` : null;

export const tname = (term, lang) => (lang === 'en' ? term.emri_en : term.emri);
export const tzone = (term, lang) => (lang === 'en' ? term.zona_en : term.zona);

export const routes = routesRaw.map((r) => ({
  ...r,
  id: slug(r.destinacioni),
  terminali: terminaliFriendly(r.terminali),
}));

export const routeById = (id) => routes.find((r) => r.id === id);

export function searchRoutes(q) {
  const nq = norm(q.trim());
  if (!nq) return routes;
  return routes.filter((r) => norm(r.destinacioni).includes(nq));
}

export const totalNisje = routes.reduce((a, r) => a + (r.nisjet?.length || 0), 0);

export const BESIMI = {
  i_verifikuar: { label: 'E verifikuar', cls: 'ok' },
  i_pjesshem: { label: 'Të dhëna të pjesshme', cls: 'warn' },
  i_paverifikuar: { label: 'Po verifikohet', cls: 'na' },
};

export const DATA_VERIFIKIMI = 'tetor 2026';

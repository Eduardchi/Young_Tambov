// src/app/router.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const HomePage = lazy(() =>
  import('@pages/HomePage').then((m) => ({ default: m.HomePage })),
);
const EventsPage = lazy(() =>
  import('@pages/EventsPage').then((m) => ({ default: m.EventsPage })),
);
const SupportPage = lazy(() =>
  import('@pages/SupportPage').then((m) => ({ default: m.SupportPage })),
);
const OpportunitiesPage = lazy(() =>
  import('@pages/OpportunitiesPage').then((m) => ({ default: m.OpportunitiesPage })),
);
const OrganizationPage = lazy(() =>
  import('@pages/OrganizationPage').then((m) => ({ default: m.OrganizationPage })),
);
const ContactsPage = lazy(() =>
  import('@pages/ContactsPage').then((m) => ({ default: m.ContactsPage })),
);
const GalleryPage = lazy(() =>
  import('@pages/GalleryPage').then((m) => ({ default: m.GalleryPage })),
);

function PageLoader() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Загрузка страницы"
      role="status"
    >
      <div className="page-spinner" aria-hidden="true" />
    </div>
  );
}

function withSuspense(Page: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  );
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: withSuspense(HomePage) },
        { path: 'events', element: withSuspense(EventsPage) },
        { path: 'support', element: withSuspense(SupportPage) },
        { path: 'opportunities', element: withSuspense(OpportunitiesPage) },
        { path: 'organization', element: withSuspense(OrganizationPage) },
        { path: 'contacts', element: withSuspense(ContactsPage) },
        { path: 'gallery', element: withSuspense(GalleryPage) },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
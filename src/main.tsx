import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nProvider } from '@lingui/react'
import { i18n, loadCatalog } from './i18n'
import './index.css'
import App from './App.tsx'

loadCatalog('en')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider i18n={i18n}>
      <App />
    </I18nProvider>
  </StrictMode>,
)

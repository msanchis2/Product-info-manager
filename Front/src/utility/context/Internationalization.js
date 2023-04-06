// ** React Imports
import { useState, createContext, useEffect } from 'react'

// ** Intl Provider Import
import { IntlProvider } from 'react-intl'

// ** Core Language Data
import messagesEn from '@assets/data/locales/en.json'
import messagesDe from '@assets/data/locales/de.json'
import messagesFr from '@assets/data/locales/fr.json'
import messagesPt from '@assets/data/locales/pt.json'

// ** User Language Data
import userMessagesEn from '@src/assets/data/locales/en.json'
import userMessagesDe from '@src/assets/data/locales/de.json'
import userMessagesFr from '@src/assets/data/locales/fr.json'
import userMessagesPt from '@src/assets/data/locales/pt.json'
// Dispatch
import { useDispatch, useSelector } from 'react-redux'
// Import Traducciones
import { TraduccionesControllerApi, settings } from '@api/backend'
const api = new TraduccionesControllerApi(settings)

// ** Menu msg obj
const menuMessages = {
  en: { ...messagesEn, ...userMessagesEn },
  de: { ...messagesDe, ...userMessagesDe },
  fr: { ...messagesFr, ...userMessagesFr },
  pt: { ...messagesPt, ...userMessagesPt }
}

// ** Create Context
const Context = createContext()
const IntlProviderWrapper = ({ children }) => {
  // Le estoy metiendo los states a piñon, por lo tanto siempre que refresque se pondra en español
  // ** States
  const [locale, setLocale] = useState(localStorage.getItem('idioma'))
  const [messages, setMessages] = useState(localStorage.getItem('idioma'))


  useEffect(() => {
    async function getAndSetTranslations() {
      api.traduccionesControllerFind(JSON.stringify(
        { where: { idiomaId: locale } }
      )).then(result => {
        const newLanguageObj = {} // {"Announcements": "Comunicados"}
        result.data?.map(traduccion => {
          if (traduccion?.valor?.length) newLanguageObj[`${traduccion.clave}`] = traduccion.valor
        })
        setMessages(newLanguageObj)
      })
    }
    getAndSetTranslations()
  }, [locale])

  // ** Switches Language
  const switchLanguage = lang => {
    setLocale(lang)
    setMessages(menuMessages[lang])
  }

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale='es'>
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export { IntlProviderWrapper, Context as IntlContext }

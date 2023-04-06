// ** React Imports
import { useContext } from 'react'
import { settings, IdiomasControllerApi } from '@api/backend'
import { IntlContext } from '@src/utility/context/Internationalization'

const api = new IdiomasControllerApi(settings)

export const useIdioma = () => {
    // ** State
    const intlContext = useContext(IntlContext)

    async function setValue(languageId) {
        await api.idiomasControllerFind().then(response => {
            const userLanguage = response.data.find(lang => lang.id === languageId)
            if (userLanguage) {
                intlContext.switchLanguage(userLanguage.lang)
            } else {
                console.error("error obteniendo lenguaje de usuario")
            }
        })
    }

    return [setValue]
}

import { useState } from 'react'

import PropTypes from 'prop-types'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import XHRUpload from '@uppy/xhr-upload'
import spanish from '@uppy/locales/lib/es_ES'
import english from '@uppy/locales/lib/en_US'
import portuguese from '@uppy/locales/lib/pt_PT'

import { Card, CardHeader, CardTitle, CardBody, CardText } from 'reactstrap'
import { devuelveBasePath } from '@src/utility/Utils'


// ** Styles
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'

const getLanguage = (locale) => {
    switch (locale) {
        case 'en':
            return english
        case 'pt':
            return portuguese
        default:
            return spanish
    }
}
const FileUploaderUppy = ({preview = true, locale, title, summaryText, setFiles, maxfiles}) => {
    const [previewArr, setPreviewArr] = useState([])
    const [filesArr, setFilesArr] = useState([])

    const uppy = new Uppy({
        meta: { type: 'avatar' },
        onBeforeFileAdded: (currentFile, files) => {
            // Agregando datos del dia antes del nombre para que no de error de que ya exista
            return {
                ...currentFile,
                name: `${(new Date()).toISOString().split('-').join('').slice(0, 11)}-${currentFile.name}`
            }
        },
        // Quitar linea de abajo para que no sea automático
        autoProceed: true,
        restrictions: { maxNumberOfFiles: maxfiles || 1, allowedFileTypes: ['image/*'] },
        locale: getLanguage(locale)
    })

    uppy.use(thumbnailGenerator)
    uppy.use(XHRUpload, { endpoint: `${devuelveBasePath()}/files-upload` })

    uppy.on('complete', (result) => {

        if (result.successful.length > 0) {
            const [data] = result.successful
            const arr = filesArr
            arr.push(data)
            setFilesArr([...arr])
            setFiles([...arr])
        }
        if (result.failed.length > 0) {
            console.error('Failed', result.failed)
        }
    })

    uppy.on('thumbnail:generated', (file, preview) => {
        const arr = previewArr
        arr.push(preview)
        setPreviewArr([...arr])
    })

    const renderPreview = () => {
        if (preview & previewArr.length) {
            return previewArr.map((src, index) => <img key={index} className='rounded mt-2 mr-1' src={src} alt='avatar' />)
        } else {
            return null
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>{title}</CardTitle>
            </CardHeader>
            <CardBody>
                <CardText>{summaryText}</CardText>
                <DragDrop uppy={uppy} />
                {renderPreview()}
            </CardBody>
        </Card>
    )
}

// ** PropTypes
FileUploaderUppy.propTypes = {
    preview: PropTypes.bool,
    locale: PropTypes.string,
    title: PropTypes.string,
    summaryText: PropTypes.string,
    setFiles: PropTypes.func,
    maxfiles: PropTypes.number
}

export default FileUploaderUppy

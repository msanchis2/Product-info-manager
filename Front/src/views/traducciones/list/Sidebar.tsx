// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

import {
    Key
} from 'react-feather'

// ** Utils
import { isObjEmpty } from '@src/utility'

// ** Third Party Components
import classNames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input, CustomInput } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'

// ** Store & Actions
import { addTraduccion } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { TraduccionState } from '../store/reducer'

// ** Types
import { RootState } from 'src/types'

const defaultValues = {
    idioma_id: '',
    valor: '',
    id: ''
}

type SidebarProps = {
    open: boolean,
    toggleSidebar: () => void
}

const SidebarTranslations = ({ open, toggleSidebar }: SidebarProps) => {
    // ** Hooks
    const intl = useIntl()
    const store = useSelector((state: RootState): TraduccionState => state.traducciones)

    // ** Store Vars
    const dispatch = useDispatch()

    // ** Vars
    const { register, errors, handleSubmit, control } = useForm({ defaultValues })

    // ** Function to handle form submit
    const onSubmit = (data: any) => {
        if (isObjEmpty(errors)) {
            toggleSidebar()

            dispatch(
                addTraduccion(data)
            )
        }
    }

    return (
        <Sidebar
            size='lg'
            open={open}
            title={intl.formatMessage({ id: 'New Translation' })}
            // headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for='clave'>
                        <FormattedMessage id="Clave" /><Key size={17} className='mx-1' />
                    </Label>
                    <Controller
                        control={control}
                        name='clave'
                        required={true}
                        render={({ onChange }) => (
                            <Input
                            type='text'
                            id='clave'
                            //className={classNames({ 'is-invalid': errors['userName'] })}
                            onChange={(e) => onChange(e.target.value)}
                            />
                        )}
                    />
                </FormGroup>
                {store.idiomas.map((lang, idx) => {
                    return (
                        // <FormGroup key={lang.id}>
                        //     <Label for={`${lang.lang}`}>{lang.description}</Label>
                        //     <Input id={`${lang.lang}`} name={lang.lang} value="" type="text" onChange={(e) => e.preventDefault()} innerRef={register()} />
                        // </FormGroup>
                        <FormGroup key={`${lang}-${idx}`}>
                            <Label for={lang.nombre}>
                                <FormattedMessage id={lang.descripcion} />
                            </Label>
                            <Controller
                                control={control}
                                name={lang.nombre as string}
                                required={true}
                                // En  el render antes estaba el campo field(QUe no funciona)
                                render={({onChange }) => (
                                    <Input
                                    type='text'
                                    id={lang.nombre}
                                    // {...field}
                                    //className={classNames({ 'is-invalid': errors['userName'] })}
                                    onChange={(e) => onChange(e.target.value)}
                                    />
                                )}
                            />
                        </FormGroup>
                    )
                })}
                <Button type='submit' className='mr-1' color='primary'>
                    <FormattedMessage id="Enviar" />
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    <FormattedMessage id="Cancelar" />
                </Button>
            </Form>
        </Sidebar>
    )
}

export default SidebarTranslations

// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getTraduccionesPorClave, updateTraduccion, getIdiomas } from '../store/action'
import { TraduccionItem, TraduccionState } from '../store/reducer'
import { RootState } from '@src/types'
// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { Card, CardBody, CardHeader, CardTitle, Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput, Alert, Container } from 'reactstrap'
import classNames from 'classnames'

// ** API
import { TraduccionesWithRelations, settings } from '@api/backend'
import { IdiomasWithRelations } from '@api/backend/axios'
import { FormattedMessage } from 'react-intl'
import { isObjEmpty } from '@src/utility'
// import {isAdmin} from '@src/auth/utils'
import { Key } from 'react-feather'

import { useAbility } from '@casl/react'
import { Can, AbilityContext } from '@src/utility/context/Can'

const TranslationEdit = () => {
    // ** Store Vars
    const store = useSelector((state: RootState): TraduccionState => state.traducciones), dispatch = useDispatch()
    const clave = useParams<{ clave: string }>()
    const history = useHistory()
    const ability = useAbility(AbilityContext)
    
    // ** Vars
    const { register, errors, handleSubmit, control, reset } = useForm()
    const { idiomas, selectedTraduccion: currentTranslations } = store
   
    useEffect(() => {
        dispatch(getTraduccionesPorClave(clave.id))
        if (!idiomas.length) dispatch(getIdiomas())
    }, [clave.id])

    if (!currentTranslations?.length || !idiomas.length) return null

    if (!ability.can("Traducciones", "PIM", "Nuevo") && !ability.can("Traducciones", "PIM", "Actualizar")) {
        return null
      }

    function getTranslation(lang) {
        const individualTranslation = currentTranslations.find(t => t.idiomaId === lang)
        return individualTranslation ? individualTranslation : null
    }

    // ** Function to handle form submit
    const onSubmit = (data: any) => {
        if (isObjEmpty(errors) && clave.id != undefined) {
            const newKeyValues = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null))
            const newTranslations = Object.keys(newKeyValues).map(lang => {
                const existingTranslation = getTranslation(lang)
                return { id: existingTranslation.id, clave: existingTranslation.clave, idiomaId: existingTranslation.idiomaId, valor: newKeyValues[lang] }
            })
            dispatch(
                updateTraduccion(newTranslations)
            )
            history.go(-1)
            // history.push("/traducciones/list")
        }
        // history.go(-1)
    }


    return (
        <Container>
            <Row>
                <Col sm={12} md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardBody>
                            <Fragment>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <FormGroup>
                                        <Label for='clave'>
                                            <FormattedMessage id="Clave" /><Key size={17} className='mx-1' />
                                        </Label>
                                        {/* <Input
                                            type='text'
                                            id='clave'
                                            disabled={true}
                                            value={clave.id}
                                        /> */}
                                        <Controller
                                            control={control}
                                            name='clave'
                                            render={({ onChange }) => (
                                                <Input
                                                    disabled={true}
                                                    type='text'
                                                    id='Clave'
                                                    placeholder='Clave'
                                                    required
                                                    className={classNames({ 'is-invalid': errors['clave'] })}
                                                    onChange={(e) => onChange(e.target.value)}
                                                    defaultValue={clave && clave.id}
                                                />
                                            )}
                                        />
                                    </FormGroup>
                                    {idiomas.map((lang, idx) => {
                                        return (
                                            // <FormGroup key={lang.id}>
                                            //     <Label for={`${lang.lang}`}>{lang.description}</Label>
                                            //     <Input id={`${lang.lang}`} name={lang.lang} value="" type="text" onChange={(e) => e.preventDefault()} innerRef={register()} />
                                            // </FormGroup>
                                            <FormGroup key={idx}>
                                                <Label for={lang.nombre}>
                                                    <FormattedMessage id={lang.descripcion} />
                                                </Label>
                                                <Controller
                                                    control={control}
                                                    name={lang.nombre as string}
                                                    //required={true}
                                                    // En el  render estaba la propiedad 'field'
                                                    render={({ onChange, name }) => (
                                                        <Input
                                                            type='text'
                                                            id={lang.nombre}
                                                            // {...field}
                                                            defaultValue={getTranslation(lang.nombre)?.valor || ""}
                                                            className={classNames({ 'is-invalid': errors[name] })}
                                                            onChange={(e) => onChange(e.target.value)}
                                                        />
                                                    )}
                                                />
                                            </FormGroup>
                                        )
                                    })}
                                    <Button type='submit' className='mr-1' color='primary'>
                                        <FormattedMessage id="Guardar" />
                                    </Button>
                                    <Button color='secondary' outline tag={Link} to='/traducciones/'>
                                        <FormattedMessage id="Atras" />
                                    </Button>
                                </Form>
                            </Fragment>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default TranslationEdit

// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getTraduccionesPorClave, updateTraduccion, getIdiomas, addTraduccion } from '../store/action'
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
import { Key } from 'react-feather'

const TranslationNew = () => {
    // ** Store Vars
    const store = useSelector((state: RootState): TraduccionState => state.traducciones),
        dispatch = useDispatch()
    const history = useHistory()

    // ** Vars
    const { register, errors, handleSubmit, control, reset } = useForm()
    const { idiomas, selectedTraduccion: currentTranslations } = store
    // ** Function to get user on mount
    useEffect(() => {
        if (!idiomas.length) dispatch(getIdiomas())
    }, [])

    if (!idiomas.length) return null

    // ** Function to handle form submit
    const onSubmit = (data: any) => {
        if (isObjEmpty(errors) && data.clave != undefined) {
            dispatch(
                addTraduccion(data)
            )
            // history.push("/traducciones/list")
        }
        history.push("/traducciones/list")
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
                                                    // en el render antes estaba la propiedad 'field'
                                                    render={({ onChange, name }) => (
                                                        <Input
                                                            type='text'
                                                            id={lang.nombre}
                                                            // {...field}
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
                                    <Button to="/traducciones/list" color='secondary' outline >
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
export default TranslationNew

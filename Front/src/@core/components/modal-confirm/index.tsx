// ** React Import
import { Fragment, useState } from 'react'

// ** Custom Components
import Modal from '../modal-message'

// ** Utils
import { isObjEmpty } from '@src/utility'

// ** Third Party Components
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Col, Row, Button, FormGroup, Label, FormText, Form, Input, CustomInput } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'


const defaultValues = {
    id: ''
}

interface Props {
    open: boolean
    toggleModal: () => void
    message: string
    title?: string
    submitAction: () => void
}

const ModalConfirm = ({ open, toggleModal, submitAction, message, title }: Props) => {
    // ** Hooks
    const intl = useIntl()

    return (
        <Modal
            size='md'
            open={open}
            title={title || intl.formatMessage({ id: 'Confirmar' })}
            // bodyClassName='modal-dialog-centered'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleModal={toggleModal}
        >

            <Fragment>
                <Row>
                    <Col>
                        <h4>{message || 'La acción requiere de confirmación'}</h4>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Button type='submit' className='mr-1' color='primary' onClick={submitAction}>
                        <FormattedMessage id="Confirmar" />
                    </Button>
                    <Button type='reset' color='secondary' outline onClick={toggleModal}>
                        <FormattedMessage id="Cancelar" />
                    </Button>
                </Row>
            </Fragment>
        </Modal>
    )
}

export default ModalConfirm

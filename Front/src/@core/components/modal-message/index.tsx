// ** Third Party Components
import { X } from 'react-feather'
import Proptypes, {InferProps} from 'prop-types'
import classnames from 'classnames'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const ModalMessage: any = (props: InferProps<typeof ModalMessage.propTypes>) => {
    // ** Props
    const {
        width,
        open,
        toggleModal,
        size,
        bodyClassName,
        contentClassName,
        wrapperClassName,
        headerClassName,
        className,
        title,
        children,
        closeBtn,
        ...rest
    } = props

    // ** If user passes custom close btn render that else default close btn
    const renderCloseBtn = closeBtn ? closeBtn : <X className='cursor-pointer' size={15} onClick={toggleModal} />

    return (
        <Modal
            isOpen={open}
            toggle={toggleModal}
            contentClassName={classnames({
                [contentClassName]: contentClassName
            })}
            modalClassName={classnames('modal-dialog-centered', {
                [wrapperClassName]: wrapperClassName
            })}
            className={classnames({
                [className]: className,
                'modal-lg': size === 'lg',
                'modal-sm': size === 'sm'
            })}
            /*eslint-disable */
            {...(width !== undefined
                ? {
                    style: { width: String(width) + 'px' }
                }
                : {})}
            /*eslint-enable */
            {...rest}
        >
            <ModalHeader
                className={classnames({
                    [headerClassName]: headerClassName
                })}
                toggle={toggleModal}
                close={renderCloseBtn}
                tag='div'
            >
                <h5 className='modal-title'>
                    <span className='align-middle'>{title}</span>
                </h5>
            </ModalHeader>
            <ModalBody
                className={classnames('flex-grow-1', {
                    [bodyClassName]: bodyClassName
                })}
            >
                {children}
            </ModalBody>
        </Modal>
    )
}

export default ModalMessage

// ** PropTypes
ModalMessage.propTypes = {
    title: Proptypes.string.isRequired,
    open: Proptypes.bool.isRequired,
    toggleModal: Proptypes.func.isRequired,
    size: Proptypes.oneOf(['sm', 'md', 'lg']),
    className: Proptypes.string,
    bodyClassName: Proptypes.string,
    contentClassName: Proptypes.string,
    wrapperClassName: Proptypes.string,
    children: Proptypes.any.isRequired,
    width: Proptypes.oneOfType([Proptypes.number, Proptypes.string])
}

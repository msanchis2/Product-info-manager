// ** Grupoatributo Edit Components
import AccountTab from './Account'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import { Card, CardBody, Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'

// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'

const MultimediaEdit = () => {
  // Ability
  const ability = useAbility(AbilityContext)
  // ** States & Vars
  const store = useSelector(state => state.multimedia)

  if (!ability.can("Multimedia", "PIM", "Nuevo") && !ability.can("Multimedia", "PIM", "Actualizar") && !ability.can("Multimedia", "PIM", "Ver")) {
    return null
  }

  return (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <AccountTab selectedMultimedia={store.selectedMultimedia || {}} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default MultimediaEdit

// ** integracion Edit Components
import AccountTab from './Account'

// ** Store & Actions
import { useSelector } from 'react-redux'

// ** Third Party Components
import { Card, CardBody, Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'

const integracionEdit = () => {
  // Ability
  const ability = useAbility(AbilityContext)
  // ** States & Vars
  const store = useSelector(state => state.integracion)

  if (!ability.can("Integracion", "PIM", "Nuevo") && !ability.can("Integracion", "PIM", "Actualizar") && !ability.can("Integracion", "PIM", "Ver")) {
    return null
  }

  return (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <AccountTab selectedintegracion={store.selectedIntegracion || {}} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default integracionEdit

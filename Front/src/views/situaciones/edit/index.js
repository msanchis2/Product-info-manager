// ** Situacion Edit Components
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

const SituacionEdit = () => {
  // Ability
  const ability = useAbility(AbilityContext)
  // ** States & Vars
  const store = useSelector(state => state.situaciones)

  if (!ability.can("Situaciones", "PIM", "Nuevo") && !ability.can("Situaciones", "PIM", "Actualizar") && !ability.can("Situaciones", "PIM", "Ver")) {
    return null
  }
  return (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <AccountTab selectedSituacion={store.selectedSituacion || {}} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default SituacionEdit

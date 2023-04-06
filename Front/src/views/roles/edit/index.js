// ** Roles Edit Components
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

const RolesEdit = () => {
  // Ability
  const ability = useAbility(AbilityContext)
  // ** States & Vars
  const store = useSelector(state => state.roles)

  if (!ability.can("Roles", "PIM", "Nuevo") && !ability.can("Roles", "PIM", "Actualizar")) {
    return null
  }

  return (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <AccountTab selectedRol={store.selectedRol || {}} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default RolesEdit

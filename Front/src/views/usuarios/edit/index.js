import AccountTab from './Account'
import { Card, CardBody, Row, Col } from 'reactstrap'

import '@styles/react/apps/app-users.scss'

// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'

const UsuarioEdit = () => {
  // ** States & Vars
  const ability = useAbility(AbilityContext)
  if (!ability.can("Usuarios", "PIM", "Nuevo") && !ability.can("Usuarios", "PIM", "Actualizar") && !ability.can("Usuarios", "PIM", "Ver")) {
    return null
  }
  return (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <AccountTab />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default UsuarioEdit

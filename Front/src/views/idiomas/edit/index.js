// ** Idioma Edit Components
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

const IdiomaEdit = () => {
  // Ability
  const ability = useAbility(AbilityContext)
  // ** States & Vars
  const store = useSelector(state => state.idiomas)

  if (!ability.can("Idiomas", "PIM", "Nuevo") && !ability.can("Idiomas", "PIM", "Actualizar")) {
    return null
  }

  return (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <AccountTab selectedIdioma={store.selectedIdioma || {}} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default IdiomaEdit

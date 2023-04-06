// ** Atributo Edit Components
import AtributosCard from './AtributosCard'
// ** Store & Actions
import { useSelector } from 'react-redux'
// ** Third Party Components
import { Card, CardBody, Row, Col } from 'reactstrap'
// ** Styles
import '@styles/react/apps/app-users.scss'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'

const AtributoEdit = () => {
  // Ability
  const ability = useAbility(AbilityContext)
  // ** States & Vars
  const store = useSelector(state => state.atributos)

  if (!ability.can("Atributos", "PIM", "Nuevo") && !ability.can("Atributos", "PIM", "Actualizar") && !ability.can("Atributos", "PIM", "Ver")) {
    return null
  }

  return (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <AtributosCard selectedAtributo={store.selectedAtributo || {}} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default AtributoEdit

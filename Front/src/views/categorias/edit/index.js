// ** Categoria Edit Components
import AccountTab from './Account'

import { useSelector } from 'react-redux'

// ** Third Party Components
import { Card, CardBody, Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'

const CategoriaEdit = () => {
  // Ability
  const ability = useAbility(AbilityContext)
  // ** States & Vars
  const store = useSelector(state => state.categorias)

  if (!ability.can("Categorias", "PIM", "Nuevo") && !ability.can("Categorias", "PIM", "Actualizar") && !ability.can("Categorias", "PIM", "Ver")) {
    return null
  }

  return (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <AccountTab selectedCategoria={store.selectedCategoria || {}} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default CategoriaEdit

// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** marca Edit Components
import AccountTab from './Account'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'
// imports para Can
import { useAbility } from '@casl/react'
import { AbilityContext } from '@src/utility/context/Can'

const marcaEdit = () => {
  // Ability
  const ability = useAbility(AbilityContext)
  // ** States & Vars
  const store = useSelector(state => state.marcas)

  if (!ability.can("Marcas", "PIM", "Nuevo") && !ability.can("Marcas", "PIM", "Actualizar") && !ability.can("Marcas", "PIM", "Ver")) {
    return null
  }

  return (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <AccountTab selectedmarca={store.selectedmarca || {}} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default marcaEdit

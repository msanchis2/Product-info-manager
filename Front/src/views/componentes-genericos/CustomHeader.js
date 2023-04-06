// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button, FormGroup } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'

// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm, linkTo, searchSN = 'S' }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center mr-2'>
            <Label for='rows-per-page'>Mostrar</Label>
            <CustomInput
              className='form-control ml-50 pr-3'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </CustomInput>
          </div>
          <Button.Ripple tag={Link} to={linkTo} color='primary'>
            Nuevo
          </Button.Ripple>
        </Col>
        {searchSN === "S" && <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
        >
          <div className='d-flex align-items-center'>
            <Label for='search-invoice'>Buscar</Label>
            <Input
              id='search-invoice'
              className='ml-50 mr-2 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>
        </Col>
        }
      </Row>
    </div>
  )
}

export default CustomHeader
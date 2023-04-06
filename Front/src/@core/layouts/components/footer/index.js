// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='https://dynamizatic.es/es' target='_blank' rel='noopener noreferrer'>
          PIM
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
      <span className='float-md-right d-none d-md-block'>
        <a href='https://dynamizatic.es/es' target='_blank' rel='noopener noreferrer'>
          DynamizaTIC
        </a>
      </span>
    </p>
  )
}

export default Footer

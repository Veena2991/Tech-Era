import {Link} from 'react-router-dom'

import './index.css'

const Course = props => {
  const {details} = props
  const {id, logoUrl, name} = details

  return (
    <Link to={`courses/${id}`} className="link-item">
      <li className="list-item">
        <img src={logoUrl} alt={name} className="logo-image" />

        <p className="c-name">{name}</p>
      </li>
    </Link>
  )
}

export default Course

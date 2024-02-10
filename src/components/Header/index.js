import {Link, withRouter} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'

import {FaSuitcase} from 'react-icons/fa'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="Header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>

      <ul className="header-para-container">
        <Link to="/" className="link-item">
          <li className="list-item">
            <p className="header-para">Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="list-item">
            <p className="header-para">Jobs</p>
          </li>
        </Link>
      </ul>
      <li className="list-item">
        <button type="button" className="Logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </li>

      <div className="icon-container">
        <Link to="/">
          <IoMdHome className="icon-home" />
        </Link>
        <Link to="/jobs">
          <FaSuitcase className="icon-home" />
        </Link>
        <button onClick={onClickLogout} type="button" className="btn-logout">
          {' '}
          <FiLogOut className="icon-home" />
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)

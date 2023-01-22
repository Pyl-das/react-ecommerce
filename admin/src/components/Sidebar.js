import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div id="layoutSidenav_nav">
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          <a className="nav-link" href="/dashboard">
            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
            Dashboard
          </a>
          {/* <a className="nav-link" href="/category-list">
            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
            Catergory List
          </a> */}
          <Link to="/category-list">Category List</Link>
          <Link to="/add-category">Category Add</Link>
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        Start Bootstrap
      </div>
    </nav>
  </div>
  )
}

export default Sidebar
import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';

import './Layout.css'

export const Layout = () => {
    const [isOpen, setIsOpen]=useState(false)
    const cambio=()=>setIsOpen(!isOpen)
  return (
    <div className="app-container">
        <nav className='navbar'>
            <button className='menu-btn' onClick={cambio}><FontAwesomeIcon icon={faBars} /></button>
            <div className='navbar-logo'><h2>Metas Fisicas 2026 - Red Cusco Norte</h2></div>
            <div className='navbar-items'>
                <NavLink to='/' className="menu-btn"><FontAwesomeIcon icon={faHome} /></NavLink>
            </div>
        </nav>
        <div className='contenido-principal'>
            <aside className={`sidebar ${isOpen ? 'open':''}`}>
                <ul className='sidebar-nav'>
                    <li> <NavLink to='/'>Inicio</NavLink> </li>
                    <li> <NavLink to='/por_programa'>Por programa</NavLink> </li>
                    <li> <NavLink to='/por_producto'>Por producto</NavLink> </li>
                    <li> <NavLink to='/por_sub_producto'>Por sub producto</NavLink> </li>
                </ul>
            </aside>

            <main className="contenido-dinamico">
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

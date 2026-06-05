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
                <div className='opt'>
                    <h3>Opciones</h3>
                </div>
                <nav className='menu'>
                    <NavLink to='/' className={({isActive})=>(isActive ? 'nav-link active':'nav-link')}>Inicio</NavLink>
                    <NavLink to='/por_programa' className={({isActive})=>(isActive ? 'nav-link active':'nav-link')}>Por programa</NavLink>
                    <NavLink to='/por_producto' className={({isActive})=>(isActive ? 'nav-link active':'nav-link')}>Por producto</NavLink>
                    <NavLink to='/por_programa_micro' className={({isActive})=>(isActive ? 'nav-link active':'nav-link')}>Programa/Micro Red</NavLink>
                    <NavLink to='/por_producto_micro' className={({isActive})=>(isActive ? 'nav-link active':'nav-link')}>Producto/Micro Red</NavLink>
                    <NavLink to='/por_micro_programa' className={({isActive})=>(isActive ? 'nav-link active':'nav-link')}>Micro Red/Programa</NavLink>
                    <NavLink to='/por_micro_eess' className={({isActive})=>(isActive ? 'nav-link active':'nav-link')}>Micro Red/eess</NavLink>
                    <NavLink to='/producto_sub_producto_micro' className={({isActive})=>(isActive ? 'nav-link active':'nav-link')}>Producto/Sub prod./Micro Red</NavLink>
                </nav>
            </aside>

            <main className="contenido-dinamico">
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './componentes/Layout'
import { Inicio } from './paginas/Inicio'
import { Por_programa } from './paginas/Por_programa'
import { Por_producto } from './paginas/Por_producto'
import { Por_programa_micro } from './paginas/Por_programa_micro'
import { Por_producto_micro } from './paginas/Por_producto_micro'
import { Por_micro_programa } from './paginas/Por_micro_programa'

export const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Inicio/>}/>
                <Route path='por_programa' element={<Por_programa/>}/>
                <Route path='por_producto' element={<Por_producto/>}/>
                <Route path='por_programa_micro' element={<Por_programa_micro/>}/>
                <Route path='por_producto_micro' element={<Por_producto_micro/>}/>
                <Route path='por_micro_programa' element={<Por_micro_programa/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

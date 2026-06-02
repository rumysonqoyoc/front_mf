import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './componentes/Layout'
import { Inicio } from './paginas/Inicio'
import { Por_programa } from './paginas/Por_programa'
import { Por_producto } from './paginas/Por_producto'
import { Por_sub_producto } from './paginas/Por_sub_producto'
import { Por_programa_micro } from './paginas/Por_programa_micro'

export const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Inicio/>}/>
                <Route path='por_programa' element={<Por_programa/>}/>
                <Route path='por_producto' element={<Por_producto/>}/>
                <Route path='por_sub_producto' element={<Por_sub_producto/>}/>
                <Route path='por_programa_micro' element={<Por_programa_micro/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import axios from 'axios'
import './Paginas.css'

const url='http://192.168.1.2:3001/api/'
export const Producto_sub_producto_micro = () => {
  const [programas, setProgramas]=useState([])
  const [productos, setProductos]=useState([])
  const [sub_productos, setSub_productos]=useState([])
  const [metas, setMetas]=useState([])
  const [cod_prg, setCod_prg]=useState([])
  const [cod_prd, setCod_prd]=useState([])
  const [cod_sub, setCod_sub]=useState([])
  
    const get_programas=async()=>{
      try{
        const res=await axios.get(url+'programas')
        setProgramas(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

    const get_productos=async()=>{
      try{
        const res=await axios.get(url+'productos'+'/'+cod_prg)
        setProductos(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

    const get_sub_productos=async()=>{
      try{
        const res=await axios.get(url+'sub_productos'+'/'+cod_prg+'/'+cod_prd)
        setSub_productos(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

    const codigo_prog=(event)=>{
      setCod_prg(event.target.value)
    }

    const codigo_prod=(event)=>{
      setCod_prd(event.target.value)
    }

    const codigo_subpro=(event)=>{
      setCod_sub(event.target.value)
    }

  useEffect(()=>{
    get_programas()
  },[])

  useEffect(()=>{
    get_productos()
  },[cod_prg])

  useEffect(()=>{
    get_sub_productos()
  },[cod_prg, cod_prd])



  /*
  useEffect(()=>{
    get_por_programa_micro()
  },[cod_prg])
  */

  return (
    <>
    <div className='row shadow-md p-3 bg-light align-middle border border-secondary rounded'>
      <div className='col-2'>
        <label htmlFor="cmb_prg" className='etiq'>Programas</label>
      </div>
      <div className='col-6'>
      <select name="programas" id="cmb_prg" className='form-select' onChange={codigo_prog}>
        <option value="">Seleccione un programa</option>
        {programas.map((item)=>(
          <option key={item.cod_prg} value={item.cod_prg}>
            {item.nom_prg}
          </option>
        ))}
      </select>
    </div>
    </div>



    <div className='row shadow-md border border-secondary rounded mt-2 p-3'>

        <div className='col-6'>
            <div className='row'>
            <div className='col-2'>
            <label htmlFor="cmb_prg" className='etiq'>Productos</label>
            </div>
            <div className='col-10'>
            <select name="programas" id="cmb_prg" className='form-select' onChange={codigo_prod}>
                <option value="">Seleccione un producto</option>
                {productos.map((item)=>(
                <option key={item.cod_prd} value={item.cod_prd}>
                    {item.nom_prd}
                </option>
                ))}
            </select>
            </div>
            </div>
        </div>


        <div className='col-6'>
            <div className='row'>
            <div className='col-4'>
            <label htmlFor="cmb_sub" className='etiq'>Sub Productos</label>
            </div>
            <div className='col-8'>
            <select name="sub_pro" id="cmb_sub" className='form-select' onChange={codigo_subpro}>
                <option value="">Seleccione un sub producto</option>
                {sub_productos.map((item)=>(
                <option key={item.cod_sub} value={item.cod_sub}>
                    {item.nom_sub}
                </option>
                ))}
            </select>
            </div>
        </div>
        </div>


    </div>

    </>
  )
}

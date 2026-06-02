import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import axios from 'axios'
import './Paginas.css'

const url='http://192.168.1.2:3001/api/'

export const Por_producto = () => {
  const [programas, setProgramas]=useState([])
  const [productos, setProductos]=useState([])
  const [metas, setMetas]=useState([])
  const [cod_prg, setCod_prg]=useState([])
  const [cod_prd, setCod_prd]=useState([])

    const cols=[
      {title:'ACTIVIDAD', data:'nom_act', width:'30%'},
      {title:'SUB PRODUCTO', data:'nom_sub', width:'35%'},
      {title:'UNIDAD DE MEDIDAD', data:'unidad', width:'20%'},
      {title:'META', data:'meta', width:'15%'}
    ]
  
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
        const res=await axios.get(url+'productos/'+cod_prg)
        setProductos(res.data)
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

    const get_por_producto=async()=>{
      try{
        const res=await axios.get(url+'por_producto/'+cod_prg+'/'+cod_prd)
        setMetas(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

  useEffect(()=>{
    get_programas()
  },[])

  useEffect(()=>{
    get_productos()
  },[cod_prg])


  useEffect(()=>{
    get_por_producto()
  },[cod_prg, cod_prd])

  return (
    <>
    <div className='row'>
      <div className='col-2'>
        <h4> <label htmlFor="cmb_prg">Programas</label></h4>
      </div>
      <div className='col-4'>
      <select name="programas" id="cmb_prg" className='form-select' onChange={codigo_prog}>
        <option value="">Seleccione un programa</option>
        {programas.map((item)=>(
          <option key={item.cod_prg} value={item.cod_prg}>
            {item.nom_prg}
          </option>
        ))}
      </select>
    </div>


    <div className='col-2'>
        <h4> <label htmlFor="cmb_prd">Productos</label></h4>
      </div>
      <div className='col-4'>
      <select name="productos" id="cmb_prd" className='form-select' onChange={codigo_prod}>
        <option value="">Seleccione un producto</option>
        {productos.map((item)=>(
          <option key={item.cod_prd} value={item.cod_prd}>
            {item.nom_prd}
          </option>
        ))}
      </select>
    </div>

    </div>



    <div className='row'>
      <DataTable data={metas} columns={cols} className='display compact table-striped table-hover table-bordered' 
      options={{
          responsive: true,
          destroy:true,
          pageLength: 10,
          lengthMenu: [5,10, 15, 50, 75, 100],
          language: {
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros por página",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            paginate: {
              first: "<<",
              last: ">>",
              next: ">",
              previous: "<"
            }
          }
        }}
      />
    </div>

    </>
  )
}

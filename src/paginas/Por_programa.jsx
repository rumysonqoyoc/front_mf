import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import axios from 'axios'
import './Paginas.css'

const url='http://192.168.1.2:3001/api/'
export const Por_programa = () => {
  const [programas, setProgramas]=useState([])
  const [metas, setMetas]=useState([])
  const [cod_prg, setCod_prg]=useState([])
    const cols=[
      {title:'PRODUCTO', data:'nom_prd', width:'25%'},
      {title:'ACTIVIDAD', data:'nom_act', width:'25%'},
      {title:'SUB PRODUCTO', data:'nom_sub', width:'25%'},
      {title:'UNIDAD DE MEDIDAD', data:'unidad', width:'15%'},
      {title:'META', data:'meta', width:'10%', className:'num_meta'}
    ]
  
    const get_programas=async()=>{
      try{
        const res=await axios.get(url+'programas')
        setProgramas(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

    const codigo_prog=(event)=>{
      setCod_prg(event.target.value)
    }

    const get_por_programa=async()=>{
      try{
        const res=await axios.get(url+'por_programa/'+cod_prg)
        setMetas(res.data)
        console.log('metas por prg:',res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

  useEffect(()=>{
    get_programas()
  },[])

  useEffect(()=>{
    get_por_programa()
  },[cod_prg])

  return (
    <>
    <div className='row shadow-lg p-3 bg-light align-middle border border-secondary rounded'>
      <div className='col-2'>
        <label htmlFor="cmb_prg" className='etiq'>Programas</label>
      </div>
      <div className='col-8'>
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



    <div className='row shadow-lg p-3 bg-light align-middle border border-secondary rounded mt-2'>
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

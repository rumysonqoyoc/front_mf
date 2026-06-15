import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import axios from 'axios'
import './Paginas.css'

const url='http://api_mf.redcusconorte.gob.pe/api/'

export const Por_micro_programa = () => {
  const [programas, setProgramas]=useState([])
  const [micro_red, setMicro_red]=useState([])
  const [metas, setMetas]=useState([])
  const [cod_prg, setCod_prg]=useState([])
  const [cod_mic, setCod_mic]=useState([])

    const cols=[
      {title:'PRODUCTO', data:'nom_prd', width:'25%'},  
      {title:'ACTIVIDAD', data:'nom_act', width:'25%'},
      {title:'SUB PRODUCTO', data:'nom_sub', width:'20%'},
      {title:'EESS', data:'nom_eess', width:'10%'},
      {title:'UNIDAD DE MEDIDAD', data:'unidad', width:'10%'},
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

    const get_micro=async()=>{
      try{
        const res=await axios.get(url+'micro_redes/')
        setMicro_red(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

    const codigo_prog=(event)=>{
      setCod_prg(event.target.value)
    }

    const codigo_micro=(event)=>{
      setCod_mic(event.target.value)
    }

    const get_por_micro_programa=async()=>{
      try{
        const res=await axios.get(url+'por_micro_programa/'+cod_mic+'/'+cod_prg)
        setMetas(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

  useEffect(()=>{
    get_programas()
  },[])

  useEffect(()=>{
    get_micro()
  },[cod_prg])


  useEffect(()=>{
    get_por_micro_programa()
  },[cod_prg, cod_mic])

  return (
    <>
    <div className='row shadow-lg p-3 bg-light align-middle border border-secondary rounded'>
      
    <div className='col-2'>
        <label htmlFor="cmb_prd" className='etiq'>Micro Red</label>
      </div>
      <div className='col-4'>
      <select name="productos" id="cmb_prd" className='form-select' onChange={codigo_micro}>
        <option value="">Seleccione una Micro Red</option>
        {micro_red.map((item)=>(
          <option key={item.cod_micro} value={item.cod_micro}>
            {item.nom_micro}
          </option>
        ))}
      </select>
    </div>

    <div className='col-1'>
        <label htmlFor="cmb_prg" className='etiq'>Programas</label>
      </div>
      <div className='col-5'>
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

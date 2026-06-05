import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import axios from 'axios'
import './Paginas.css'

const url='http://192.168.1.2:3001/api/'

export const Micro_eess = () => {
  const [micro_red, setMicro_red]=useState([])
  const [eess, setEess]=useState([])
  const [metas, setMetas]=useState([])
  const [cod_mic, setCod_mic]=useState([])
  const [cod_est, setCod_est]=useState([])

    const cols=[
      {title:'PROGRAMA', data:'nom_act', width:'20%'},  
      {title:'PRODUCTO', data:'nom_act', width:'20%'},  
      {title:'ACTIVIDAD', data:'nom_act', width:'20%'},
      {title:'SUB PRODUCTO', data:'nom_sub', width:'20%'},
      {title:'UNIDAD DE MEDIDAD', data:'unidad', width:'10%'},
      {title:'META', data:'meta', width:'10%', className:'num_meta'}
    ]
  
    const get_eess=async()=>{
      try{
        const res=await axios.get(url+'eess_micro'+'/'+cod_mic)
        setEess(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

    const get_micro=async()=>{
      try{
        const res=await axios.get(url+'micro_redes')
        setMicro_red(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

    const codigo_micro=(event)=>{
      setCod_mic(event.target.value)
    }

    const codigo_est=(event)=>{
      setCod_est(event.target.value)
    }

    const get_por_micro_eess=async()=>{
      try{
        const res=await axios.get(url+'por_micro_eess/'+cod_mic+'/'+cod_est)
        setMetas(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

  useEffect(()=>{
    get_micro()
  },[])

  useEffect(()=>{
    get_eess()
  },[cod_mic])


  useEffect(()=>{
    get_por_micro_eess()
  },[cod_mic, cod_est])

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

    <div className='col-2'>
        <label htmlFor="cmb_est" className='etiq'>Establecimientos</label>
      </div>
      <div className='col-4'>
      <select name="eess" id="cmb_est" className='form-select' onChange={codigo_est}>
        <option value="">Seleccione un Establecimiento</option>
        {eess.map((item)=>(
          <option key={item.cod_eess} value={item.cod_eess}>
            {item.nom_eess}
          </option>
        ))}
      </select>
    </div>

    </div>



    <div className='row shadow-lg p-3 bg-light align-middle border border-secondary rounded mt-2'>
      <DataTable caption='hello' data={metas} columns={cols} className='display compact table-striped table-hover table-bordered' 
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

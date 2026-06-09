import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import axios from 'axios'
import './Paginas.css'

DataTable.use(DT);

const url='http://api_mf.redcusconorte.gob.pe/api/inicio'
export const Inicio = () => {
  const [metas, setMetas]=useState([])
  const cols=[
    {title:'PROGRAMA', data:'nom_prg', width:'15%'},
    {title:'PRODUCTO', data:'nom_prd', width:'20%'},
    {title:'ACTIVIDAD', data:'nom_act', width:'20%'},
    {title:'SUB PRODUCTO', data:'nom_sub', width:'20%'},
    {title:'UNIDAD DE MEDIDAD', data:'unidad', width:'15%'},
    {title:'META FISICA', data:'meta', width:'10%', className:'num_meta'}
  ]

  const get_inicio=async()=>{
    try{
      const res=await axios.get(url)
      setMetas(res.data)
    }catch(error){
      console.error('error al obtener datos')
    }
  }

  useEffect(()=>{
    get_inicio()
  },[])


  return (
    <>
    <div className='border border-secondary shadow-lg p-3 rounded'>
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

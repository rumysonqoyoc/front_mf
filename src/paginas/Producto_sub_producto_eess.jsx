import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels'

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);


import axios from 'axios'
import './Paginas.css'

const url='http://api_mf.redcusconorte.gob.pe/api/'
export const Producto_sub_producto_eess = () => {
  const [programas, setProgramas]=useState([])
  const [micro, setMicro]=useState([])
  const [cod_mic, setCod_mic]=useState([])
  const [productos, setProductos]=useState([])
  const [sub_productos, setSub_productos]=useState([])
  const [cod_prg, setCod_prg]=useState([])
  const [cod_prd, setCod_prd]=useState([])
  const [cod_sub, setCod_sub]=useState([])
  const [data_prd, setData_prd]=useState({
    labels:[],
    datasets:[{label:'Micro Redes',data:[]}]
  })

  const [data_sub, setData_sub]=useState({
    labels:[],
    datasets:[{label:'Micro Redes',data:[]}]
  })

 const options = {
    indexAxis: 'y', // ESTO ES LA CLAVE: Gira el gráfico a horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display:false
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  }

  
    const get_programas=async()=>{
      try{
        const res=await axios.get(url+'programas')
        setProgramas(res.data)
      }catch(error){
        console.error('error al obtener datos')
      }
    }

    const get_micro_red=async()=>{
      try{
        const res=await axios.get(url+'micro_redes')
        setMicro(res.data)
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

    const get_graf_producto_eess=async()=>{
      try{
        const res=await axios.get(url+'graf_producto_eess'+'/'+cod_prg+'/'+cod_prd+'/'+cod_mic)
        const est1=res.data.map(est=>est.nom_eess)
        const met1=res.data.map(mt=>parseInt(mt.meta))
        setData_prd({labels:est1,datasets:[{label:'Metas', data:met1, backgroundColor: 'rgba(69, 229, 246, 0.5)', borderColor: 'rgba(8, 65, 221, 0.5)', borderWidth: 5, borderRadius: 8}]})
      }catch(error){
        console.error('error al obtener datos')
      }
    }

    const get_graf_sub_producto_eess=async()=>{
      try{
        const res=await axios.get(url+'graf_sub_producto_eess'+'/'+cod_prg+'/'+cod_prd+'/'+cod_sub+'/'+cod_mic)
        const est2=res.data.map(est=>est.nom_eess)
        const met2=res.data.map(mt=>parseInt(mt.meta))
        setData_sub({labels:est2,datasets:[{label:'Metas', data:met2, backgroundColor: 'rgba(195, 242, 183, 0.5)', borderColor: 'rgba(9, 131, 43, 0.5)', borderWidth: 5, borderRadius: 8}]})
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

    const codigo_prod=(event)=>{
      setCod_prd(event.target.value)
    }

    const codigo_subpro=(event)=>{
      setCod_sub(event.target.value)
    }

  useEffect(()=>{
    get_programas()
    get_micro_red()
  },[])

  useEffect(()=>{
    get_productos()
  },[cod_prg])

  useEffect(()=>{
    get_sub_productos()
  },[cod_prg, cod_prd])


  useEffect(()=>{
    get_graf_producto_eess()
  },[cod_prg, cod_prd, cod_mic])

  useEffect(()=>{
    get_graf_sub_producto_eess()
  },[cod_prg, cod_prd, cod_sub, cod_mic])

  return (
    <>
    <div className='row shadow-md p-2 bg-light align-middle border border-secondary rounded'>
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


    <div className='col-2'>
        <label htmlFor="cmb_mic" className='etiq'>Micro Red</label>
      </div>
      <div className='col-4'>
      <select name="productos" id="cmb_mic" className='form-select' onChange={codigo_micro}>
        <option value="">Seleccione una Micro Red</option>
        {micro.map((item)=>(
          <option key={item.cod_micro} value={item.cod_micro}>
            {item.nom_micro}
          </option>
        ))}
      </select>
    </div>
    
    </div>



    <div className='row shadow-md border border-secondary rounded mt-2 p-3'>

        <div className='col-6'>
            <div className='row'>
            <div className='col-2'>
            <label htmlFor="cmb_prd" className='etiq'>Productos</label>
            </div>
            <div className='col-10'>
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
              <div className='col-12 shadow-lg grf-prod'>
                <Bar key={JSON.stringify(data_prd)} data={data_prd} options={options} />
              </div>
            </div>
        </div>


        <div className='col-6'>
            <div className='row'>
            <div className='col-3'>
            <label htmlFor="cmb_sub" className='etiq'>Sub Productos</label>
            </div>
            <div className='col-9'>
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

        <div className='row'>
          <div className='col-12 shadow-lg grf-prod'>
            <Bar key={JSON.stringify(data_sub)} data={data_sub} options={options} />
          </div>
        </div>

        </div>
    </div>
    </>
  )
}

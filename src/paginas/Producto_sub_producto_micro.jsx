import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


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


const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ventas mensuales ($)',
        data: [650, 590, 800, 810, 560],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };


 const options = {
    indexAxis: 'y', // ESTO ES LA CLAVE: Gira el gráfico a horizontal
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Reporte de Ventas 2026',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  
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
            <Bar data={data} options={options} />;
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
        </div>

        

    </div>

    </>
  )
}

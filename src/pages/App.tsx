/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react'
import useAPI from '../hooks/useAPI'
import './App.css'

function App() {

  const {isLoading, fetchedDatas, isError} = useAPI({id:'tt3230854', longPlot:false})

  return (
    <>
      <span>{JSON.stringify(fetchedDatas)}</span>
      <img style={{width:'300px'}} src={fetchedDatas?.Poster}/>
    </>
  )
}

export default App

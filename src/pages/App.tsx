// import { useState } from 'react'
import useAPI from '../hooks/useAPI'
import './App.css'

function App() {

  const movie = useAPI({searchBy:'id', id:'tt3230854', longPlot:false})

  return (
    <>
      {JSON.stringify(movie)}
    </>
  )
}

export default App

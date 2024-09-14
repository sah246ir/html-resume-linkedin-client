import React, { FormEvent, useContext, useState } from 'react'
import DialogWrapper from '../DialogWrapper'
import { OpenAiContext } from '../../context'

const logo = require("../../imgs/openai.png")
const ApiKeyDialog = () => {
  const Openai = useContext(OpenAiContext)
  const [key, Setkey] = useState<string>("")

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault()
    Openai.setKey(key) 
  }
  return (
    <DialogWrapper>
      <article className='w-[85vw] h-[75vh]  bg-gray-800 text-white p-11'>
        <h1 tabIndex={0} className='text-5xl mb-3'>Lets Build A Resume!</h1>
        <h2 tabIndex={0}>Enter Your Open Api Key To Continue</h2>  
        <form onSubmit={onSubmit} className="mt-[5em] w-full">
          <p tabIndex={0} className='!text-left w-full mb-2' >Open AI Key</p> 
          <div className="flex items-center  bg-white bg-opacity-10 ">
            <img width={65} className='py-3 px-4' src={logo} alt="open ai logo" />
            <div className="flex flex-col gap-1 w-full">
            <input
                  value={key}
                  onChange={(e)=>Setkey(e.currentTarget.value)}
                  className=' py-3 px-2 bg-transparent'
                  id='openai_key'
                  placeholder='Your Key'
                  name='key'
                  type="text" />
              </div> 
          </div>
          <button className='transition duration-300 mt-5 bg-white bg-opacity-10 hover:bg-opacity-5 w-full py-2 px-2 rounded'>Save Key</button>
        </form>



      </article>
    </DialogWrapper>
  )
}

export default ApiKeyDialog

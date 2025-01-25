
import React from 'react'

const NewsLetterBox = () => {
  const onSubmitHandler = (event)=>{
    event.preventDefault();
  }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-500'>Subscribe now & get 20% off</p>
        {/* font-medium: Độ dày của chữ sẽ là trung bình, không quá đậm như font-bold nhưng cũng không quá mỏng. */}
        <p className='text-gray-400 mt-3'>Lorem  ipsum is simply</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
          <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter email' />
          <button type='submit' className='bg-black text-white text-sm px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
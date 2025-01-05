import React from 'react'

const AddMedicine = () => {
  return (
    <>
    <section className="ml-60">
    <div className="flex justify-between mb-5 -mt-80">
        <h2 className='text-2xl mx-3 font-bold'>Add Medicine</h2>
        <h2 className='text-xl font-bold'>Dashboard/ <span className='text-green-600'>Add medicine</span></h2>
    </div>
      <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif] shadow-lg shadow-blue-300">
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Name</label>
        <input type="text" placeholder="Enter your name"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white" />
      </div>

      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Email</label>
        <input type="email" placeholder="Enter your email"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white" />
      </div>

      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Phone No.</label>
        <input type="number" placeholder="Enter your phone no"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white" />
      </div>

      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">State</label>
        <input type="text" placeholder="Enter your state"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white" />
      </div>

      <button type="button"
        className="!mt-8 px-6 py-2 w-full bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block">Submit</button>
    </form>
    </section>
 
    </>
  )
}

export default AddMedicine

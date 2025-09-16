import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from 'lucide-react'

const ExploreBlock = () => {
  return (
    <div className='grid grid-cols-4 gap-4 my-10'>
      <div className='col-span-3 rounded-4xl bg-[url(/images/manhattan-explore-block.jpg)] aspect-video bg-cover bg-center flex flex-col justify-between place-items-start p-20'>
        <div className='text-white'>
          <h2 className='font-medium text-6xl text-shadow-md'>Plan to visit <b className='block font-bold'>Manhattan?</b></h2>
          <h5 className='text-2xl mt-4 text-shadow-md'>Introducing 200+ city tour plans</h5>
        </div>
        <Link className='group rounded-full bg-white py-2 px-4 font-semibold text-lg flex items-center gap-1' to='/search?q=Manhattan'>Explore <ChevronRightIcon className='size-6 -mr-1 w-0 transition-all duration-100 group-hover:w-6' /></Link>
      </div>
      <div className='col-span-1 rounded-4xl border-4 border-foreground/20 bg-foreground/5 text-foreground py-8 p-6'>
        <h3 className='font-semibold text-2xl'>Popular Cities</h3>
        <ul className='my-8 space-y-4 text-xl'>
          <li><Link to='/search?q=San Francisco'>San Francisco</Link></li>
          <li><Link to='/search?q=Los Angeles'>Los Angeles</Link></li>
          <li><Link to='/search?q=Las Vegas'>Las Vegas</Link></li>
          <li><Link to='/search?q=Boston'>Boston</Link></li>
          <li><Link to='/search?q=Chicago'>Chicago</Link></li>
          <li><Link to='/search?q=Austin'>Austin</Link></li>
          <li><Link to='/search?q=Denver'>Denver</Link></li>
          <li><Link to='/search?q=Seattle'>Seattle</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default ExploreBlock
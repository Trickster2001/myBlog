import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <div><nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white text-lg font-semibold">My App</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/page1" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Page 1</Link>
                <Link to="/page2" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Page 2</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav></div>
      <Outlet />
    </div>
  )
}

export default App
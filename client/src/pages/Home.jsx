import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Restaurants from '../components/Restaurants'
import Swal from 'sweetalert2'
import RestaurantService from '../services/retaurant.service'

const Home = () => {

  const [restaurants, setRestaurants] = useState([])
  const [filteredRestaurant, setFilteredRestaurant] = useState([])

  useEffect(() => {
    // call api: GetAllRestaurants
    const getAllRestaurant = async () => {
      try{
        const response = await RestaurantService.getAllRestaurants()

        if (response.status === 200) {
          setRestaurants(response.data)
          setFilteredRestaurant(response.data)
        }
      }catch(error) {
        Swal.fire({
          title: "Get All restaurants",
          icon: "error",
          text: error?.response?.data?.message || error.message
        })
      }
    }
    getAllRestaurant()

  }, [])

  const handleSearch = (keyword) => {
    if (keyword === '') {
      setFilteredRestaurant(restaurants)
      return;
    }

    const result = restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
        restaurant.type.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      )
    })
    setFilteredRestaurant(result)
    // console.log(result)
  }

  return (
    <div className='container mx-auto'>
      {/* Navigation */}
      {/* Header */}
      <div>
        <h1 className='justify-center text-3xl text-center m-5 p-5'>Grab Restaurant 666</h1>
      </div>
      {/* Search Box */}
      <div className='mb-5 flex justify-center items-center'>
        <label className="input flex items-center gap-2 w-2xl">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" name='keyword' onChange={(e) => handleSearch(e.target.value)} />
        </label>
      </div>
      {/* Result */}
      <Restaurants restaurants={filteredRestaurant} />
    </div>
  )
}

export default Home
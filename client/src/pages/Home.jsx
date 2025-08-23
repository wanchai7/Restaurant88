import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Restaurants from '../components/Restaurants'
import Swal from 'sweetalert2'
import RestaurantService from '../services/retaurant.service'

const Home = () => {
  const [restaurants, setRestaurants] = useState([])
  const [filteredRestaurant, setFilteredRestaurant] = useState([])

  useEffect(() => {
    const getAllRestaurant = async () => {
      try {
        const response = await RestaurantService.getAllRestaurants()
        if (response.status === 200) {
          setRestaurants(response.data)
          setFilteredRestaurant(response.data)
        }
      } catch (error) {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          icon: 'error',
          text: error?.response?.data?.message || error.message,
        })
      }
    }
    getAllRestaurant()
  }, [])

  const handleSearch = (keyword) => {
    if (keyword === '') {
      setFilteredRestaurant(restaurants)
      return
    }

    const result = restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.type.toLowerCase().includes(keyword.toLowerCase())
      )
    })
    setFilteredRestaurant(result)
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation */}

      {/* Header */}
      <div className="hero bg-primary text-primary-content py-10">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">🍽️ รายการร้านอาหาร & เครื่องดื่ม</h1>
            <p className="py-6 text-lg">ค้นหาร้านอร่อยใกล้คุณได้ที่นี่</p>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="flex justify-center mt-8">
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xl">
          <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="ค้นหาร้านอาหารหรือประเภทอาหาร..."
            className="grow"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </label>
      </div>

      {/* Result */}
      <div className="px-4 py-10">
        <Restaurants restaurants={filteredRestaurant} />
      </div>
    </div>
  )
}

export default Home

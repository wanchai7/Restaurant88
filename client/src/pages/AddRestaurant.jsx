import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Drop from '../components/Drop'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import RestaurantService from '../services/retaurant.service'
import Swal from 'sweetalert2'

const AddRestaurant = () => {
  const { user } = useAuthContext()
  const [restaurant, setRestaurant] = useState({
    name: '',
    type: '',
    imageUrl: ''
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (
      !user?.authorities.includes('ROLES_ADMIN') &&
      !user?.authorities.includes('ROLES_MODERATOR')
    ) {
      navigate('/')
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setRestaurant({ ...restaurant, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await RestaurantService.insertRestaurant(restaurant)

      if (response.status === 200) {
        Swal.fire({
          title: 'Add Restaurant',
          text: 'Restaurant added successfully!',
          icon: 'success'
        })
        setRestaurant({
          name: '',
          type: '',
          imageUrl: ''
        })
      }
    } catch (e) {
        console.log(e)
      Swal.fire({
        title: 'Add Restaurant',
        icon: 'error',
        text: e?.response?.data?.message || e.message
      })
    }
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md bg-base-100 shadow-xl p-8 space-y-5 border border-orange-200"
      >
        <h2 className="text-3xl font-bold text-center text-orange-600">
          🍴 Add Restaurant
        </h2>

        {/* Restaurant Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-green-700">
              ชื่อร้าน
            </span>
          </label>
          <div className="flex items-center gap-2">
            <Drop />
            <input
              value={restaurant.name}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="ชื่อร้าน"
              className="input input-bordered w-full input-success"
              required
            />
          </div>
        </div>

        {/* Type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-green-700">
              รายละเอียด
            </span>
          </label>
          <div className="flex items-center gap-2">
            <Drop />
            <input
              value={restaurant.type}
              onChange={handleChange}
              type="text"
              name="type"
              placeholder="รายละเอียด"
              className="input input-bordered w-full input-accent"
              required
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-green-700">
            URL รูปภาพ
            </span>
          </label>
          <div className="flex items-center gap-2">
            <Drop />
            <input
              value={restaurant.imageUrl}
              onChange={handleChange}
              type="text"
              name="imageUrl"
              placeholder="URL รูปภาพ"
              className="input input-bordered w-full input-warning"
            />
          </div>
        </div>

        {/* Preview Image */}
        {restaurant.imageUrl && (
          <div className="mt-4">
            <img
              className="w-full h-48 object-cover rounded-lg border border-orange-300"
              src={restaurant.imageUrl}
              alt="Preview"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-outline btn-error"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant

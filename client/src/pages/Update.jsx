import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Drop from '../components/Drop'
import { useParams } from 'react-router'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router'

const Update = () => {
    const { user } = useAuthContext()

    // 1. Get from url
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (!user?.authorities.includes('ROLES_ADMIN') && !user?.authorities.includes('ROLES_MODERATOR')) {
            navigate('/')
        }
    }, [user])
   

    const [restaurant, setRestaurant] = useState({
        name: '',
        type: '',
        imageUrl: ''
    });

     //  2. Get Restaurant by ID
     useEffect(() => {
        fetch(`http://localhost:5000/api/v1/restaurant/${id}`)
            .then((res) => {
                //  convert text to json format
                return res.json();
            })
            .then((resp) => {
                // save to state
                setRestaurant(resp)
            })
            .catch((e) => {
                // catch error
                console.log(e.message)
            })
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        setRestaurant({ ...restaurant, [name]: value }) // {...restaurant clone ของเดิม
    }

    const handleSubmit = async () => {
        try {
            // async await
            const response = await fetch(`http://localhost:5000/api/v1/restaurant/${id}`, {
                method: "PUT",
                body: JSON.stringify(restaurant),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                alert("Restaurant Updated successfully!")
                setRestaurant({
                    name: '',
                    type: '',
                    imageUrl: ''
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className='flex justify-center items-center text-center mt-5'>
                <form className='border w-[500px] space-y-5 p-10 rounded-2xl shadow-lg shadow-cyan-500/50'>
                    <div>
                        Update
                    </div>
                    <div className='space-x-2'>
                        <Drop />
                        <input value={restaurant.name} onChange={handleChange} className='border outline-none rounded-2xl placeholder:text-cyan-500/50 border-cyan-500/50 pl-3 shadow-lg shadow-cyan-500/50' type="text" name='name' placeholder='name' />
                    </div>
                    <div className='space-x-2'>
                        <Drop />
                        <input value={restaurant.type} onChange={handleChange} className='border outline-none rounded-2xl placeholder:text-purple-500/50 border-purple-500/50 pl-3 shadow-lg shadow-purple-500/50' type="text" name='type' placeholder='type' />
                    </div>
                    <div className='space-x-2'>
                        <Drop />
                        <input value={restaurant.imageUrl} onChange={handleChange} className='border outline-none rounded-2xl pl-3 placeholder:text-yellow-500/50 border-yellow-500/50 shadow-lg shadow-yellow-500/50' type="text" name='imageUrl' placeholder='imageUrl' />
                    </div>
                    <div className='space-x-2'>
                        <button type='submit' className='bg-linear-to-r rounded-[2px] shadow-lg shadow-red-500/50 from-red-500 to-pink-500 w-[100px] cursor-pointer'>Cancel</button>
                        <button onClick={handleSubmit} type='submit' className='bg-linear-to-r rounded-[2px] shadow-lg shadow-blue-500/50 from-blue-500 to-blue-800 w-[100px] cursor-pointer'>Update</button>
                    </div>
                    <div>
                        {
                            restaurant.imageUrl && (
                                <div>
                                    <img className='w-full h-[300px] object-cover' src={restaurant.imageUrl} alt="" />
                                </div>
                            )
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default Update
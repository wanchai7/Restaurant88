import { useState } from 'react'

const Signup = () => {

  const [signup, setSignup] = useState({
          username: '',
          name: '',
          password: '',
          email: ''
      });
  
      const handleChange = (e) => {
          const { name, value } = e.target
          setSignup({ ...signup, [name]: value })
      }
  
      const handleSubmit = async () => {
          try {
              // async await 
              const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
                  method: "POST",
                  body: JSON.stringify(signup),
                  headers: {
                      "Content-Type": "application/json"
                  }
              })
              if (response.ok){
                  alert("Register Successfully!")
                  setSignup({
                      username: '',
                      name: '',
                      password: '',
                      email: ''
                  })
              }
          }catch(e){
              console.log(e)
          }
      }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Register
          </h2>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              onChange={handleChange}
              value={signup.username}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="username"
              required
              onChange={handleChange}
              value={signup.name}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={handleChange}
              value={signup.password}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="current-password"
              required
              onChange={handleChange}
              value={signup.email}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Have a account?{' '}
          <a href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup
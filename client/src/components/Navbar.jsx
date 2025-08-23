import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import UserProfile from './UserProfile'

const Navbar = () => {
  const { user } = useAuthContext()

  const menuItems = [
    { name: 'ค้นหา', url: '/' },
    { name: 'เพิ่มร้านอาหาร', url: '/add' },
    { name: 'เกี่ยวกับเรา', url: '/' },
  ]

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* ซ้าย: Logo + เมนูมือถือ */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems.map((item, i) => (
              <li key={i}>
                <a href={item.url} className="text-base">{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <a href="/" className="btn btn-ghost normal-case text-xl text-primary font-bold">
          🍴 Grab Restaurant
        </a>
      </div>

      {/* กลาง: เมนู Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <a href={item.url} className="text-base hover:text-accent">{item.name}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* ขวา: ปุ่ม Login/Register หรือโปรไฟล์ */}
      <div className="navbar-end space-x-2">
        {user ? (
          <UserProfile />
        ) : (
          <div className="flex gap-2">
            <a href="/signup" className="btn btn-outline btn-secondary">สมัครสมาชิก</a>
            <a href="/signin" className="btn btn-outline btn-accent">เข้าสู่ระบบ</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar

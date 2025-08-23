import React from 'react'

const Profile = () => {
  return (
    <div className="max-w-md mx-auto mt-10 card bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <div className="avatar">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="object-cover"
            />
          </div>
        </div>
        <h2 className="card-title text-primary mt-4">สมชาย ใจดี</h2>
        <p className="text-secondary font-medium">Frontend Developer</p>
        <p className="text-sm text-base-content mt-4">
          สวัสดีครับ ผมเป็นนักพัฒนาเว็บไซต์ที่มีความชำนาญด้าน React และมีประสบการณ์ในการสร้าง UI ที่สวยงามและใช้งานง่าย
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline btn-primary"
          >
            🌐 Facebook
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline btn-neutral"
          >
            💻 GitHub
          </a>
          <a
            href="mailto:somchai@example.com"
            className="btn btn-sm btn-outline btn-error"
          >
            📧 Email
          </a>
        </div>
      </div>
    </div>
  )
}

export default Profile

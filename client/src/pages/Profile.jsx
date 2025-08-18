const Profile = () => {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden text-center p-6">
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 object-cover"
      />
      <h2 className="mt-4 text-2xl font-bold text-gray-800">สมชาย ใจดี</h2>
      <p className="text-blue-600 font-medium mt-1">Frontend Developer</p>
      <p className="mt-4 text-gray-600 text-sm">
        สวัสดีครับ ผมเป็นนักพัฒนาเว็บไซต์ที่มีความชำนาญด้าน React และมีประสบการณ์ในการสร้าง UI ที่สวยงามและใช้งานง่าย
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 font-semibold transition duration-200"
        >
          🌐 Facebook
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-black font-semibold transition duration-200"
        >
          💻 GitHub
        </a>
        <a
          href="mailto:somchai@example.com"
          className="text-red-500 hover:text-red-700 font-semibold transition duration-200"
        >
          📧 Email
        </a>
      </div>
    </div>
  );
};

export default Profile;

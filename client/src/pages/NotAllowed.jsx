import React from 'react';

const NotAllowed = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="bg-white border border-red-300 shadow-lg rounded-xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 ไม่ได้รับอนุญาต</h1>
        <p className="text-gray-700 mb-6">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบหากคิดว่าเกิดข้อผิดพลาด
        </p>
        <a
          href="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          กลับหน้าหลัก
        </a>
      </div>
    </div>
  );
};

export default NotAllowed;

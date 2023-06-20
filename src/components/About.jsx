import React from "react";

function about() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
        alt="NULL"
        className="w-max h-auto hover: cursor-pointer"
      />
      <h1 className="text-red-500 hover:text-black hover:cursor-pointer">
        This is CEO
      </h1>

      <h1 className="text-blue-500 hover:text-black hover:cursor-grab">
        His name is raccoon
      </h1>
    </div>
  );
}

export default about;

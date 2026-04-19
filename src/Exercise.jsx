import React from "react";
import UserCard from "./UserCard";

function Exercise() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          User Cards
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <UserCard 
          name="Toffan" 
          email="Toffan@gmail.com"
          street="Jl. Bima 2"
          city="Bandung"
          /> 
          <UserCard name="Tofin" 
          email="Tofin@gmail.com"
          street="Jl. Bima 3"
          city="London"
          />
          <UserCard name="Taufan" 
          email="Taufan@gmail.com"
          street="Jl. Bima 4"
          city="Semarang"
          />
        </div>
      </div>
    </>
  );
}

export default Exercise
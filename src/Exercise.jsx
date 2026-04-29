//import React, { useEffect, useState } from "react";
//import UserCard from "./UserCard";
import React from "react";
import { posts } from "./postsData";
import PostCard from "./PostCard"; 


 function Exercise() {
  return (
    <div className="min-h-screen bg-gray-100 p-6"> 
      <h1 className="text-3xl font-bold text-center mb-6 text-red-700">
        Post Cards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-[90%] px-2 mx-auto">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}

export default Exercise

/*function Exercise() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("[Component] Gagal menampilkan data:", error.message);
    }
  };
  fetchData();
}, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          User Cards
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {users.map((user, index) => (
            <UserCard key={index} {...user} />
          ))}
        </div>
      </div>
    </>
  );
}*/

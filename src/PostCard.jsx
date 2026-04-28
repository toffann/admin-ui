import React from "react";
import PostCard from "./PostCard"; 
import { posts } from "./postsData"; 

function Exercise() {
  return (
    
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-8 text-red-600 uppercase">
        Post Cards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-[98%] mx-auto">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            title={post.title} 
            body={post.body} 
          />
        ))}
      </div>
    </div>
  );
}

export default Exercise;
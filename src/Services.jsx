export const users = [ 
          
    {
      name:"Toffan", 
      email:"Toffan@gmail.com",
      street:"Jl. Bima 2",
      city:"Bandung",
      job:"software Developer",
    },
    {
      name:"Tofin", 
      email:"Tofin@gmail.com",
      street:"Jl. Bima 3",
      city:"London",
    },
    {
      name:"Taufan", 
      email:"Taufan@gmail.com",
      street:"Jl. Bima 4",
      city:"Semarang",
    },
  ];

  export const getUsers = () => {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => 
      users.map((user) => ({
        name: user.name,
        email: user.email,
    }))
    )
  
    .catch((error)=> {
      console.error(error);
      throw error;
    });  
};

export const getPosts = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => 
      // Kita ambil 3 post saja agar tidak terlalu memenuhi layar
      posts.map((post) => ({
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      }))
    )
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
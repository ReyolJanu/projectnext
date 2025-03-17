"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  description: string;
  short_description:string;
  image?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, []);

  return (
    <div>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </main>
      
      <div className="flex justify-end px-4">
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">Search</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link key={post._id} href={"/post/"+post._id}>

          <div key={post._id} className="border border-gray-200 p-4">
            <img className="w-full h-48 object-cover mb-4" src={post.image || "https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-600nw-1029506242.jpg"} alt="Post Image" />
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.short_description}</p>
          </div>

          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Post {
  _id: string;
  title: string;
  description: string;
  short_description: string;
  image?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searching, setSearching] = useState(false);  // Change search to searching to better reflect the process

  useEffect(() => {
    // Fetch the initial posts when the page loads
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, []);

  // Function to handle the search
  const searchPost = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    const query = inputRef.current?.value.trim();
    if (!query) return;

    // Start the search process
    // setSearching(true);

    if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Enter") {
      return;
    }

    // Perform the search API request
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .finally(() => setSearching(false));  // Re-enable the button once search is completed
  };

  return (
    <div>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </main>

      <div className="flex justify-end px-4">
        <input
          onKeyDown={searchPost}  // Trigger search on 'Enter' key press
          ref={inputRef}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button
          onClick={searchPost}  // Trigger search on button click
          disabled={searching}  // Disable button during search process
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
        >
          {searching ? "..." : "Search"}  {/* Show loading text when searching */}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/post/${post._id}`}
            className="border border-gray-200 p-4 block rounded-md shadow-md hover:shadow-lg transition-shadow"
          >
            <div>
              <img
                className="w-full h-48 object-cover mb-4 rounded-md"
                src={
                  post.image ||
                  "https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-600nw-1029506242.jpg"
                }
                alt={post.title}
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))}
        {posts.length === 0 && inputRef.current && inputRef.current.value && (
          <p>No Posts Available for: <b>{inputRef.current.value}</b></p>
        )}
      </div>
    </div>
  );
}

"use client"
import { useEffect, useState } from "react";
import { use } from "react";

export default function Post({ params }) {
    const resolvedParams = use(params); // Unwrapping params
    const id = resolvedParams.id;

    const [post, setPost] = useState(null);

    useEffect(() => {
        // Only fetch if id has changed
        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`)
                .then(res => res.json())
                .then(res => setPost(res));
        }
    }, [id]); // Adding id to the dependency array

    return (
        <>
            {post && (
                <main className="container mx-auto px-4 py-6">
                    <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
                    <p className="text-gray-500">Published on {post.created_at_formated}</p>
                    <img  src="https://picsum.photos/200" alt="Post Image" className="my-4 w-1/4 " />
                    <p>{post.description}</p>
                </main>
            )}
        </>
    );
}

import React, { useState } from 'react';

const MenteePage = () => {
    const [blogPost, setBlogPost] = useState('');
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    // Function to handle posting a blog
    const handlePostBlog = () => {
        if (blogPost.trim()) {
            setBlogPosts([...blogPosts, { post: blogPost, file: selectedFile }]);
            setBlogPost(''); // Clear the text area after posting
            setSelectedFile(null); // Clear the selected file
        }
    };

    // Function to handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Store the selected file
    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">
            <h1>Mentee Page </h1>
            {/* Blog Post Input Area with Increased Width */}
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">

                <h2 className="text-2xl font-semibold mb-4">Post a Blog</h2>
                <textarea
                    value={blogPost}
                    onChange={(e) => setBlogPost(e.target.value)}
                    placeholder="Write your blog post here..."
                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="6"
                />

                {/* File Selection Button */}
                <div className="mt-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {selectedFile && (
                        <p className="text-sm mt-2 text-gray-600">
                            Selected File: <span className="font-bold">{selectedFile.name}</span>
                        </p>
                    )}
                </div>

                <button
                    onClick={handlePostBlog}
                    className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Post Blog
                </button>
            </div>

            {/* Previous Blog Posts Underneath the Input */}
            <div className="max-w-4xl mx-auto mt-8">
                <h3 className="text-lg font-semibold mb-4">Previous Blog Posts</h3>
                {blogPosts.length === 0 && (
                    <p className="text-gray-500">No blog posts yet.</p>
                )}
                {blogPosts.map((entry, index) => (
                    <div
                        key={index}
                        className="p-4 mb-4 bg-white border border-gray-300 rounded-md shadow-sm"
                    >
                        <p className="text-gray-700">{entry.post}</p>
                        {entry.file && (
                            <p className="mt-2 text-sm text-gray-500">
                                Attached File: <span className="font-semibold">{entry.file.name}</span>
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenteePage;

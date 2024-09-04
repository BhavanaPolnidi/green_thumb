import React, { useState } from 'react';

const token = "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";

const Design = () => {
    const [prompt, setPrompt] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const query = async (prompt) => {
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ inputs: prompt }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.blob();
            return result;
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    const handleGenerate = async () => {
        if (prompt) {
            try {
                const response = await query(prompt);
                const imageUrl = URL.createObjectURL(response);
                setImageSrc(imageUrl);

                // Optional: Clean up the object URL after the image is loaded
                const image = new Image();
                image.src = imageUrl;
                image.onload = () => URL.revokeObjectURL(imageUrl);
            } catch (error) {
                console.error("Error generating image:", error);
            }
        } else {
            console.error("No prompt entered");
        }
    };

    // Inline styles
    const containerStyle = {
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '500px',
        margin: 'auto'
    };

    const headingStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '10px',
        fontSize: '16px',
        color: '#555'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    };

    const buttonHoverStyle = {
        backgroundColor: '#218838'
    };

    const imgStyle = {
        display: 'block',
        marginTop: '20px',
        maxWidth: '100%',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Start Garden Designing Today</h2>
            <label htmlFor="text" style={labelStyle}>Create an image from text prompt:</label>
            <input
                type="text"
                id="text"
                placeholder="Enter your prompt here"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={inputStyle}
            />
            <button
                onClick={handleGenerate}
                style={buttonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
            >
                Generate
            </button>
            {imageSrc && <img id="image" src={imageSrc} alt="Generated Image" style={imgStyle} />}
        </div>
    );
};

export default Design;

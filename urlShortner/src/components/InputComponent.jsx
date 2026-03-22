import React, { useState } from "react";
import { sendUrl } from "../utils/api-server";
import "./InputComponent.css"
export const InputComponent = () => {
    const [InputValue, SetInputValue] = useState('');
    const [loading, SetLoading] = useState(false);
    const [redirectUrl, SetRedirectUrl] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!InputValue) {
            alert("Please enter a URL");
            return;
        }

        try {
            SetLoading(true);
            const data = await sendUrl(InputValue);

            if (data) {
                SetRedirectUrl(data);
            }
        } catch (error) {
            SetRedirectUrl("https://www.error.com");
            console.log(error);
        } finally {
            SetLoading(false);
        }
    };

        return (
            <div className="container">
                <div className="card">
                    <h1>URL Shortener</h1>
        
                    <form onSubmit={submitHandler}>
                        <div className="input-group">
                            <label>Enter your URL</label>
                            <input
                                type="text"
                                placeholder="Paste your long URL..."
                                value={InputValue}
                                onChange={(e) => SetInputValue(e.target.value)}
                            />
                        </div>
        
                        <button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Shorten URL"}
                        </button>
                    </form>
        
                    {loading && <div className="loading">Processing...</div>}
        
                    {redirectUrl && (
                        <div className="result">
                            <p>Short URL:</p>
                            <a href={redirectUrl} target="_blank" rel="noopener noreferrer">
                                {redirectUrl}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
};
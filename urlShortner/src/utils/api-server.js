import axios from "axios";
const api = import.meta.env.VITE_API_URL
export const sendUrl = async (url) => {
    const data = {
        longUrl: url
    };

    try {
        console.log("API:",api)
        const response = await axios.post(
            `${api}/shorten`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response.data)
        return response.data.shortUrl; // adjust based on API response
    } catch (error) {
        console.log(error.message);
        throw error; // important so frontend catch works
    }
};
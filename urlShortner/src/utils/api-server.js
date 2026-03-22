import axios from "axios";

export const sendUrl = async (url) => {
    const data = {
        longUrl: url
    };

    try {
        const response = await axios.post(
            "https://lyslwokumc.execute-api.us-east-1.amazonaws.com/prod/shorten",
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
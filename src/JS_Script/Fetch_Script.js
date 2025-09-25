
const Local_URl_HOST = "http://127.0.0.1:5000/responseGenerator"
const Cloud_URL_HOST = "https://vinort-backend.onrender.com/responseGenerator"

const Fetch_Data = (data) => {
        
        return fetch(Cloud_URL_HOST, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        });
}

export {Fetch_Data}
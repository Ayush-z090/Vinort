
const URl_HOST = "https://vinort-backend.onrender.com/responseGenerator"

const Fetch_Data = (data) => {
        
        return fetch(URl_HOST, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        });
}

export {Fetch_Data}
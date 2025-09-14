
const URl_HOST = "http://127.0.0.1:5000/responseGenerator"

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
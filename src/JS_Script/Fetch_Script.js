
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

JSON.parse(localStorage.getItem("calls")) ?"" : localStorage.setItem("calls",true) 


if(localStorage.getItem("calls")) {
    localStorage.setItem("calls",false)
    Fetch_Data(Cloud_URL_HOST)
  .then(rj => alert("Server is awake"))
  .catch(err => {
    console.error("Server is not responding", err);
    throw new Error("Server wake-up failed"); // explicitly throw error
  });
}

export {Fetch_Data}
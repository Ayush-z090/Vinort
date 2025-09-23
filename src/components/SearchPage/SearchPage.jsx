import { useEffect, useState, useContext } from "react"
import { useLocation, useParams } from "react-router-dom"
import Style from "./SearchPage.module.css"
import SeacrchQuery_videoCard from "../Cards/Card"
import { AppContext } from "../../App.jsx"

// Dummy array of objects based on YouTube API response structure
const dummySearchData = [
    {
        id: {
            kind: "youtube#video",
            videoId: "dQw4w9WgXcQ"
        },
        snippet: {
            publishedAt: "2023-10-28T15:30:00Z",
            channelId: "UCuAXFkgsw1L7xaCfnd5JJOw",
            title: "Sample Video Title 1 - Amazing Content",
            channelTitle: "Sample Channel 1",
            thumbnails: {
                high: {
                    url: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                }
            }
        }
    },
    {
        id: {
            kind: "youtube#video", 
            videoId: "jNQXAC9IVRw"
        },
        snippet: {
            publishedAt: "2023-11-15T10:45:00Z",
            channelId: "UCBJycsmduvYEL83R_U4JriQ",
            title: "Sample Video Title 2 - Tutorial Series",
            channelTitle: "Tech Tutorials",
            thumbnails: {
                high: {
                    url: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg"
                }
            }
        }
    },
    {
        id: {
            kind: "youtube#video",
            videoId: "M7lc1UVf-VE"
        },
        snippet: {
            publishedAt: "2023-12-01T08:20:00Z", 
            channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
            title: "Sample Video Title 3 - Entertainment Show",
            channelTitle: "Entertainment Hub",
            thumbnails: {
                high: {
                    url: "https://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg"
                }
            }
        }
    },
    {
        id: {
            kind: "youtube#video",
            videoId: "9bZkp7q19f0"
        },
        snippet: {
            publishedAt: "2023-12-10T14:15:00Z",
            channelId: "UCBJycsmduvYEL83R_U4JriQ", 
            title: "Sample Video Title 4 - Music Video",
            channelTitle: "Music Channel",
            thumbnails: {
                high: {
                    url: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg"
                }
            }
        }
    },
    {
        id: {
            kind: "youtube#video",
            videoId: "kJQP7kiw5Fk"
        },
        snippet: {
            publishedAt: "2023-12-20T16:30:00Z",
            channelId: "UCuAXFkgsw1L7xaCfnd5JJOw",
            title: "Sample Video Title 5 - Educational Content", 
            channelTitle: "Education Channel",
            thumbnails: {
                high: {
                    url: "https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg"
                }
            }
        }
    }
]



export function Page_Content({maxResultNum=15,sty={},mode="auto"}){

	const { 
		SearchQuery,
		isWidthLimit,
		searchDataCache,
		setSearchDataCache,
		recommendationDataCache,
		setRecommendationDataCache
	} = useContext(AppContext);

	let userCategories;
	try {
		userCategories = JSON.parse(localStorage.getItem("UserChoosenCategoires") || "[]")
	} catch (e) {
		userCategories = []
	}
	let seachQueryRandom = userCategories.length ? Math.floor(Math.random() * userCategories.length) : 0

	let [SearchData,setData]= useState([]);

	let query;
	switch (mode) {
		case "search":
            console.log(SearchQuery)
			query = SearchQuery || "";
			break;
		case "local":
			query = userCategories.length ? userCategories[seachQueryRandom] : "";
			break;
		default: // "auto" preserves legacy behavior
			query = SearchQuery ? SearchQuery : (userCategories.length ? userCategories[seachQueryRandom] : "");
	}

	let API_KEY = import.meta.env.VITE_YT_API_KEY

	let FETCH_data = async () => {
		try{
			if (!query) {
				setData([])
				return;
			}

			// Check cache first
			const cacheKey = `${mode}_${query}_${maxResultNum}`;
			
			// For recommendation mode, check if we already have cached data
			if (mode === "local" && recommendationDataCache) {
				setData(recommendationDataCache);
				return;
			}
			
			// For search mode, check if we have cached data for this query
			if (mode === "search" && searchDataCache[cacheKey]) {
				setData(searchDataCache[cacheKey]);
				return;
			}

			let API_URl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=rating&type=video&maxResults=${maxResultNum}&q=${encodeURIComponent(query)}&key=${API_KEY}`
			let FetchData = await fetch(API_URl)
			if(!FetchData.ok) {
				setData(dummySearchData)
				throw new Error("most likely yt api limit reached")};
			let DATA = await FetchData.json()
			if (!DATA.items && (DATA?.error?.code === 403)){
				setData(dummySearchData)
				throw new Error("yt api limit reach")
			}
			
			// Cache the data
			if (mode === "local") {
				setRecommendationDataCache(DATA.items);
			} else if (mode === "search") {
				setSearchDataCache(prev => ({
					...prev,
					[cacheKey]: DATA.items
				}));
			}
			
			setData(DATA.items)
		}catch(err){
			console.log(`unable to reload \nError: ${err.message}`)
		}
	}

	useEffect(()=>{
		FETCH_data()
	},[query, maxResultNum, mode])

	return(
		<>
		<div 
        className={Style.SearchPage}
        style= {
            isWidthLimit ? 
            {
                overflow:"none",
                gap:"3rem",...sty} : sty}>
			{SearchData?.map(cardData =>cardType(cardData))}
		</div>
		</>
	)
}
function cardType(data){
    //types
    let Location = useLocation()
    // let CardTypes =["youtube#video","youtube#channel"]

    if (data?.id.kind === "youtube#video") return <SeacrchQuery_videoCard dataObject={data} key={data?.id.videoId} Textsty={location.pathname !== "/Stream" ?{color : "black"} : {}}/>
    // if (data?.id.kind === "youtube#channel") return <SeacrchQuery_ChannelCard dataObject={data} key={data?.id.videoId} />
}
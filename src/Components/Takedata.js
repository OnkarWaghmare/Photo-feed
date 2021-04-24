import { useEffect } from "react";
import React, {useState}from "react";
import "./Takedata.css"
import RightArrow from "./../images/right-arrow.png";
import LeftArrow from "./../images/left-arrow.png"

const Takedata=()=>{
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [index, setIndex] = useState(0);

    // Initial data fetching
    useEffect(() => {
        fetch("https://api.unsplash.com/search/photos?query=nature&client_id=Ki0FngEJOfTALpbX-EPB5CrxsDOd6js0t3WkJqXJkHo")
        .then((res)=>res.json())
        .then((obj)=>setData(obj.results))
    }, [])

    
    useEffect(()=>{
        document.addEventListener("scroll", infiniteScroll);
        return()=>document.removeEventListener("scroll", infiniteScroll);
        }
    
    )

    // Infinite Scroll logic
    const infiniteScroll=()=>{
        if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight){
            fetch("https://api.unsplash.com/search/photos?query=random&client_id=Ki0FngEJOfTALpbX-EPB5CrxsDOd6js0t3WkJqXJkHo")
            .then((res)=>res.json())
            .then((obj)=>{
                const temp=[...data,...obj.results];
                setData(temp);
            })
        }
    }

    const toggleModalDisplay=(e)=>{
        let currIndex=data.findIndex((ele)=>ele.id===e.target.id);
        //console.log(e.target);
        setIndex(currIndex);
        setFlag(!flag);

    }
    const getPrevImg=()=>{
        if(index!==0){
            setIndex(index-1);
        }else setIndex(data.length-1);
        
    }

    const getNextImg=()=>{
        if(index!==(data.length-1)){
            setIndex(index+1);
        }else setIndex(0);
    }
    
    return(
        <>
        <div className="container" onClick={toggleModalDisplay}>
            {data.map((ele)=>
            <div className="item"><img src={ele.urls.regular} alt="photoItem" id={ele.id} className="imgItem"/></div>)}
        </div>

        {/* Conditional randering of image modal */}
        {flag && <div className="modalContainer">
            <button id="prev" onClick={getPrevImg}><img src={LeftArrow} className="icon" alt="leftArrowIcon"/></button>
            <img src={data[index].urls.regular} id="modalImg" alt="modalImg"/>
            <button id="next" onClick={getNextImg}><img src={RightArrow} className="icon" alt="rightArrowIcon"/></button>
            <p id="modalMessage">To close the image modal click on any background image tile</p>
            </div>}
        </>
    )
}

export default Takedata;
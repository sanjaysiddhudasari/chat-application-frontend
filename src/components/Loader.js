import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loader(){
    return (
        <div  style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
            <ClipLoader color="#427bf5" size={45}/>
        </div>  
    )
}

export default Loader;
import React, {useState} from "react";
import Map from "./Map.jsx";

function MapView(props){
    return(
        <section className="border border-black w-full container">
            <Map />
        </section>
    );
}

export default MapView;

"use client"
import React from "react";

async function createReign(){
    const name = document.getElementsByTagName("input")[0].value
    const response = await fetch(`http://localhost:8080/create/${name}`)

    try{
        const reign = response.json();
        window.location.href = "/dashboard";
    } catch {
        alert("Qualcosa è andato storto")
    }
}

const Page = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Come vuoi chiamare il regno?</legend>
                <input type="text" className="input" placeholder="Scrivi qua il nome" />
            </fieldset>
            <button className="btn" onClick={createReign}>Crea regno</button>
        </div>

    );
};

export default Page;
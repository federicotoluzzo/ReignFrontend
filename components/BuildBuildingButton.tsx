"use client"
import React from 'react'
import { set } from 'react-hook-form'
import { toast, Toaster } from 'sonner'

async function build(terrainType:string, buildingType:string){
    const resp = await fetch(`http://127.0.0.1:8080/build/${terrainType}+${buildingType}`)
    if(await resp.text() === "false"){
        toast.error("Edificio non costruito")
        return
    }
    toast.success("Edificio costruito")
    setTimeout(() => window.location.reload(), 1000)
}

const BuildBuildingButton = (props:{terrain:Terrain, option:string}) => {
    return (
        <li onClick={() => build(props.terrain.type, props.option)}><img className="w-16 drop-shadow-sky-950 drop-shadow-md" src={props.option == "LUMBERJACK_HUT" ? "cabin.png" : (props.option == "PIG_FARM" ? "pig.png" : (props.option == "FIELD_FARM" ? "wheat.png" : "minings.png"))}></img><Toaster className="fixed bottom-10 right-10"/></li>
    )
}

export default BuildBuildingButton

"use client"
import { useState, useEffect } from 'react'
import React from 'react'

const Warehouse = () => {
    // State to store our terrain data
    const [warehouse, setWarehouse] = useState<Resource[]>([])

    // useEffect takes two arguments:
    // 1. A function with the code to run
    // 2. An array of dependencies (empty array means run once when mounted)
    useEffect(() => {
        // Define the fetch function inside useEffect
        const fetchTerrain = async () => {
            try {
                const resp = await fetch("http://localhost:8080/reign")
                const reign = await resp.json()
                setWarehouse(reign.warehouse.warehouse)
            } catch (err) {
                console.error("Failed to fetch terrain data:", err)
            }
        }

        fetchTerrain()

        const interval = setInterval(fetchTerrain, 5000)

        // Cleanup function that runs when component unmounts
        return () => clearInterval(interval)
    }, [])
    
    return (
        <div className="text-center font-black">Magazzino :
                <ul className="flex flex-row gap-4 m-8">
                    {warehouse.map(resource => (
                        <li key={resource.type} className="bg-sky-900 rounded-2xl p-4 flex flex-col items-center justify-center">
                            <img className="w-16 drop-shadow-sky-950 drop-shadow-md" src={resource.type == "WOOD" ? "wood.png" : (resource.type == "STONE" ? "granite.png" : (resource.type == "VEGETABLE" ? "carrot.png" : "ham-leg.png"))}></img>
                            <p className="font-black">{resource.quantity}</p>
                        </li>
                    ))}
                </ul>
        </div>
    )
}

export default Warehouse
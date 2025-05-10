import Link from "next/link";
import {DialogTest} from "@/components/Dialog"
import {Dialog, DialogContent, DialogOverlay, DialogTrigger} from "@/components/ui/dialog";
import BuildBuildingButton from "@/components/BuildBuildingButton";
import Warehouse from "@/components/Warehouse";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Toaster } from "@/components/ui/sonner";

export default async function Home() {
    const resp = await fetch("http://localhost:8080/reign");
    let reign:Reign = null;
    try{
      reign = await resp.json();
    } catch {
      return <div className="flex flex-col gap-4 items-center justify-center h-screen">
          Regno ancora non creato
          <Link href="/create"><button className="btn">Crea Regno</button></Link>
      </div>
    }
    let key = 0;
    return (
        <div className="flex flex-col gap-10 w-fit mx-auto items-center justify-center pointer-events-none h-screen">
            <div className="pointer-events-none z-1">
                <p className="font-black text-center">Nome : {reign.name}</p>
                <p className="font-black text-center">Oro : {reign.gold}</p>
                <div className="mx-auto flex self-center w-fit">
                    <Warehouse />
                </div>
                <div className="text-center font-black">Terreni :
                    <div className="flex flex-row gap-4 m-8">
                        {reign.map.map(terrain => (
                            terrain ?
                                <Dialog key={key++} >
                                    <DialogOverlay className="backdrop-blur-sm bg-transparent">
                                        <Toaster className="fixed z-50"/>
                                    </DialogOverlay>
                                    <DialogTrigger className="aspect-square relative bg-success rounded-2xl p-4 flex items-center flex-col gap-2 justify-center pointer-events-auto hover:cursor-pointer hover:-translate-y-2 shadow-white transition-all">
                                        <img className="w-16 drop-shadow-sky-950 drop-shadow-md" src={terrain.type == "MOUNTAIN" ? "mountain.png" : (terrain.type == "FIELD" ? "fields.png" : "trees.png")}></img>
                                        <img className="w-8 bg-white aspect-square rounded-full border-4 absolute top-8/12 left-8/12" src={terrain.building != null ? (terrain.building.type == "LUMBERJACK_HUT" ? "cabin.png" : (terrain.building.type == "PIG_FARM" ? "pig.png" : (terrain.building.type == "FIELD_FARM" ? "wheat.png" : (terrain.building.type == "QUARRY" ? "minings.png" : "")))) : ""}></img>
                                    </DialogTrigger>
                                    <DialogContent className="bg-base-200 border-none">
                                        <div>
                                            {
                                                terrain.building != null ?
                                                    <div className="p-2 rounded-lg flex flex-row gap-4 items-center justify-center">
                                                        <img className="w-16 aspect-square" src={terrain.building != null ? (terrain.building.type == "LUMBERJACK_HUT" ? "cabin.png" : (terrain.building.type == "PIG_FARM" ? "pig.png" : (terrain.building.type == "FIELD_FARM" ? "wheat.png" : (terrain.building.type == "QUARRY" ? "minings.png" : "")))) : ""}></img>
                                                        <p className="flex flex-row items-center justify-center">Da ritirare : {terrain.building.production.quantity} <img className="w-8 drop-shadow-sky-950 drop-shadow-md" src={terrain.building.resource == "WOOD" ? "wood.png" : (terrain.building.resource == "STONE" ? "granite.png" : (terrain.building.resource == "VEGETABLE" ? "carrot.png" : "ham-leg.png"))}></img></p>
                                                        <p>Velocità : {terrain.building.productionRate}</p>
                                                    </div>
                                                    :
                                                    <div>
                                                        Costruibili :
                                                        <ul>
                                                            {
                                                                terrain.options.map(option =>
                                                                    <BuildBuildingButton key={option} option={option} terrain={terrain}/>
                                                                )
                                                            }
                                                        </ul>
                                                    </div>
                                            }
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            :
                                <div key={key++} className="aspect-square bg-neutral-800 rounded-2xl p-4 items-center flex">Terreno ancora da sbloccare</div>
                        ))}
                    </div>
                </div>
            </div>
    
            <div className="flex flex-row fixed z-0 pointer-events-auto w-screen h-screen items-center justify-around top-0">
                <div className="transform-gpu perspective-near">
                    <div className="grid-cols-6 w-120 h-120 transform-gpu perspective-near grid rotate-y-30 gap-1 relative">
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-1 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-2 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-3 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-4 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-5 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-6 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-1 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-2 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-3 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-4 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-5 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-6 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-1 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-2 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-3 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-4 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-5 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-6 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-1 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-2 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-3 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-4 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-5 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-6 border-2 transform-gpu rounded-xl origin-left hover:translate-x-4 hover:translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="w-full h-full bg-gradient-to-r absolute to-base-100 pointer-events-none"></div>
                    </div>
                </div>
                <div className="transform-gpu perspective-near">
                    <div className="grid-cols-6 w-120 h-120 transform-gpu perspective-near grid -rotate-y-30 gap-1 relative">
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-6 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-5 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-4 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-3 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-2 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-1 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-6 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-5 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-4 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-3 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-2 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-1 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-6 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-5 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-4 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-3 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-2 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-1 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-6 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-5 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-4 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-3 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-2 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="opacity-10 border-sky-200 hover:bg-sky-400 hover:shadow-lg shadow-sky-200 -z-1 border-2 transform-gpu rounded-xl p-4 origin-left hover:-translate-x-4 hover:-translate-z-2 transition-transform duration-500 ease-in-out h-full pointer-events-auto"></div>
                        <div className="w-full h-full bg-gradient-to-l absolute to-base-100 pointer-events-none"></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

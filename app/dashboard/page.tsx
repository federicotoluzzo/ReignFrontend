import Link from "next/link";
import {DialogTest} from "@/components/Dialog"
import {Dialog, DialogContent, DialogOverlay, DialogTrigger} from "@/components/ui/dialog";
import BuildBuildingButton from "@/components/BuildBuildingButton";
import Warehouse from "@/components/Warehouse";
import { DialogTitle } from "@radix-ui/react-dialog";

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
        <div className="flex flex-col gap-10 w-screen items-center justify-center">
            <p className="font-black">Nome : {reign.name}</p>
            <p className="font-black">Oro : {reign.gold}</p>
            <Warehouse />
            <div className="text-center font-black">Terreni :
                <div className="flex flex-row gap-4 m-8">
                    {reign.map.map(terrain => (
                        terrain ?
                            <Dialog key={key++}>
                                <DialogOverlay className="backdrop-blur-sm bg-transparent"></DialogOverlay>
                                <DialogTrigger className="aspect-square relative bg-success rounded-2xl p-4 flex items-center flex-col gap-2 justify-center">
                                    <img className="w-16 drop-shadow-sky-950 drop-shadow-md" src={terrain.type == "MOUNTAIN" ? "mountain.png" : (terrain.type == "FIELD" ? "fields.png" : "trees.png")}></img>
                                    <img className="w-8 bg-white aspect-square rounded-full border-4 absolute top-8/12 left-8/12" src={terrain.building != null ? (terrain.building.type == "LUMBERJACK_HUT" ? "cabin.png" : (terrain.building.type == "PIG_FARM" ? "pig.png" : (terrain.building.type == "FIELD_FARM" ? "wheat.png" : (terrain.building.type == "QUARRY" ? "minings.png" : "")))) : ""}></img>
                                </DialogTrigger>
                                <DialogContent className="bg-base-200 border-none">
                                    <DialogTitle></DialogTitle>
                                    <div>
                                        {
                                            terrain.building != null ?
                                                <div className="p-2 rounded-lg flex flex-row gap-4 items-center justify-center">
                                                    <img className="w-16 aspect-square" src={terrain.building != null ? (terrain.building.type == "LUMBERJACK_HUT" ? "cabin.png" : (terrain.building.type == "PIG_FARM" ? "pig.png" : (terrain.building.type == "FIELD_FARM" ? "wheat.png" : (terrain.building.type == "QUARRY" ? "minings.png" : "")))) : ""}></img>
                                                    <p>Risorse immagazzinate : {terrain.building.production.quantity} {terrain.building.production.type}</p>
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
    );
}

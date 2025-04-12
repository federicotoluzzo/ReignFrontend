interface Reign{
    name: string,
    gold: number,
    warehouse: Warehouse,
    map: Terrain[],
}

interface Warehouse{
    WOOD: number,
    STONE: number,
    VEGETABLE: number,
    MEAT: number,
    IRON: number
}

interface Terrain{
    type: string,
    options: string,
    building: Building
}

interface Building{
    type: string,
    resource: string,
    production: Resource,
    productionRate: number
}

interface Resource{
    type: string,
    quantity: number
}

export default async function Home() {
  const resp = await fetch("http://localhost:8080/reign");
  const reign:Reign = await resp.json();
  let key = 0; 
  return (
      <div className="flex flex-col gap-10 w-screen items-center justify-center">
          <p>Reign name : {reign.name}</p>
          <p>Reign gold : {reign.gold}</p>
          <div>
              Reign warehouse :
              <p>🪵  {reign.warehouse.WOOD}</p>
              <p>🪨  {reign.warehouse.STONE}</p>
              <p>🥕  {reign.warehouse.VEGETABLE}</p>
              <p>🥩  {reign.warehouse.MEAT}</p>
              <p>⛓️  {reign.warehouse.IRON}</p>
          </div>
          <div>Reign terrains :
              <div className="flex flex-row gap-4">
                  {reign.map.map(terrain => (
                      terrain ?
                          <div key={key++} className="aspect-square bg-neutral-800 rounded-2xl p-4 flex items-center flex-col gap-2">
                              <p>Tipo : {terrain.type}</p>
                              <p>Costruibili : {terrain.options}</p>
                              <div className="bg-neutral-700 p-2 rounded-lg">
                                  <p>Tipo : {terrain.building.type}</p>
                                  <p>Risorse immagazzinate : {terrain.building.production.quantity} {terrain.building.production.type}</p>
                                  <p>Velocità : {terrain.building.productionRate}</p>
                              </div>
                          </div>
                          :
                          <div key={key++} className="aspect-square bg-neutral-800 rounded-2xl p-4 items-center flex">Terreno ancora da sbloccare</div>
                  ))}
              </div>

          </div>
      </div>
  );
}

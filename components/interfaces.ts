interface Reign{
    name: string,
    gold: number,
    warehouse: Warehouse,
    map: Terrain[],
}

interface Warehouse{
    warehouse: Resource[]
}

interface Terrain{
    type: string,
    options: string[],
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
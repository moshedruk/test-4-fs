import { enumBeeperStatus } from "../enum/enumBeeper"

export default interface IBeeper{
    id:number
    name:string
    status:enumBeeperStatus
    created_At:Date
    detonated_at:Date
    latitude: number
    longitude: number
}
import { enumBeeperStatus } from "../enum/enumBeeper"

export default interface NewPositionAndStatusBeeperDTO {      
    latitude?: number
    longitude?: number
    status? :enumBeeperStatus
}
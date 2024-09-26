import Target from "../models/targetModel";

export default interface NewBeeperDTO {
    name: string,
    target?: Target,    
}
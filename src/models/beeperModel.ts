import { enumBeeperStatus } from "../enum/enumBeeper";
import IBeeper from "../interface/interfaceBeeper";
import Target from "./targetModel";

class Beeper  {
    public id:number;    
    public status:enumBeeperStatus;
    public created_At:Date
    public detonated_at?:Date
    public latitude?: number
    public longitude?: number
    
    constructor(
        public name:string,
        public targets?:Target
    ) {
        
        this.id = +Math.random().toString().split('.')[1];
        this.created_At = new Date();
        this.status = enumBeeperStatus.MANUFACTURED;
    }
}
export default Beeper;
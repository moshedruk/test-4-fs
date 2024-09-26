import { getFileData, saveFileData } from "../config/filedatalayer";
import NewBeeperDTO from "../DTO/newBeeper";
import NewPositionAndStatusBeeperDTO from "../DTO/newPosition";
import { enumBeeperStatus } from "../enum/enumBeeper";
import Beeper from "../models/beeperModel";

export default class beeperService{

    public static async setStatus(index: number): Promise<void> {
        console.log("setStatus", index);
        try {            
            let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];           
            console.log(`status: ${beepers[index].status} -> DEPLOYED, timer 5 secondseeeeeeeeeeeeee...`);                
            
            setTimeout(async () => {                        
                beepers[index].status = enumBeeperStatus.DETONATED;   
                console.log(`status: ${beepers[index].status} -> DETONATED`);                                                               
                await saveFileData<Beeper>("beepers", beepers);
            }, 10000);                  
            
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }
    
        
      
    public static async createNewBeeper(newBeeper: NewBeeperDTO): Promise<boolean> {        
        const beeper: Beeper = new Beeper(newBeeper.name, newBeeper.target);
        let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
        if(!beepers) beepers = [];        
        beepers.push(beeper);        
        return await saveFileData<Beeper>("beepers", beepers);
    }
    public static async getAllBeepers(): Promise<Beeper[]> {            
        let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
        if(!beepers) beepers = [];      
        
        return beepers
    }
    public static async deleteBeeperById(id:string): Promise<boolean> {     
        let myConverter = Number(id);
        let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
        let tempBeepers: Beeper[] = beepers.filter(bip => bip.id != myConverter);
        return await saveFileData<Beeper>("beepers", tempBeepers);        
        
    }
    public static async updeteBeeperStatusById(id:string,newstatus:NewPositionAndStatusBeeperDTO): Promise<boolean> {    
        let myConverter = Number(id);                 
        let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
        const index = beepers.findIndex(bip => bip.id == myConverter); 
        if(!newstatus.status){
            if(index !== -1){
                switch (beepers[index].status) {
                    case  enumBeeperStatus.MANUFACTURED:
                        beepers[index].status = enumBeeperStatus.ASSEMBLED;
                        break;                        
                    case enumBeeperStatus.ASSEMBLED:
                        beepers[index].status = enumBeeperStatus.SHIPPED;
                        break;                    
                    case enumBeeperStatus.SHIPPED:                    
                    
                    beepers[index].status = enumBeeperStatus.DEPLOYED                     
                    beepers[index].latitude = newstatus.latitude;
                    beepers[index].longitude = newstatus.longitude;   
                    await saveFileData<Beeper>("beepers", beepers);                  
                        await this.setStatus(index)
                        break;                    
                    case enumBeeperStatus.DEPLOYED:  

                        break;
                        
                    case enumBeeperStatus.DETONATED:
                        break;
                
                    default:
                        break;
                }
            }
        }
        else{
            beepers[index].status = newstatus.status  
            
        }
        
        return await saveFileData<Beeper>("beepers", beepers);
    }    

    public static async getBeeperBySearch(word:string): Promise<Beeper[]> {    
        
        console.log(word)         
        let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
        const filteredbeepers = beepers.filter(bip => bip.status == word);         
        return filteredbeepers
    }

    public static async getBeeperById(id:string): Promise<Beeper|undefined >  {         
        let myConverter = Number(id);
        let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
        const filteredPosts = beepers.find(bip => bip.id == myConverter);         
        return filteredPosts
    }
}
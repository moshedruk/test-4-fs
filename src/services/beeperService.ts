import { getFileData, saveFileData } from "../config/filedatalayer";
import NewBeeperDTO from "../DTO/newBeeper";
import Beeper from "../models/beeperModel";

export default class beeperService{
    public static async createNewBeeper(newBeeper: NewBeeperDTO): Promise<boolean> {
        //create new user 
        const beeper: Beeper = new Beeper(newBeeper.name, newBeeper.target);
        let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
        if(!beepers) beepers = [];
        // push
        beepers.push(beeper);
        // write to file
        return await saveFileData<Beeper>("beepers", beepers);
    }
    public static async getAllBeepers(): Promise<Beeper[]> {     
        
        let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
        if(!beepers) beepers = [];      
        
        return beepers
    }
    public static async deleteBeeperById(): Promise<Beeper[]> {     
        
        let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
        if(!beepers) beepers = [];      
        
        return beepers
    }
    // public static async getBeeperBySearch(wors:string): Promise<Beeper[]> {    
    //     console.log(wors) 
        
    //     let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
    //     const filteredPosts = beepers.filter(post => post.content.includes(wors));         
    //     return filteredPosts
    // }
    public static async getBeeperById(id:string): Promise<Beeper|undefined >  {         
        let myConverter = Number(id);
        let beepers: Beeper[] = await getFileData<Beeper>("beepers") as Beeper[];
        const filteredPosts = beepers.find(bip => bip.id == myConverter);         
        return filteredPosts
    }
}
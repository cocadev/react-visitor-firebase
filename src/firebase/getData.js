import { get, ref } from "firebase/database"
import { realTimeDatabase } from "."

export const getData = async (dataref) => {
    const data = await get(ref(realTimeDatabase, dataref))
    return data
}
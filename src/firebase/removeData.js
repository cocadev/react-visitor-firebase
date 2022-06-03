import { ref, remove } from "firebase/database"
import { realTimeDatabase } from "."

export const removeData = async (dataref) => {
        const deletedata = await remove(ref(realTimeDatabase,dataref))
        return deletedata
}
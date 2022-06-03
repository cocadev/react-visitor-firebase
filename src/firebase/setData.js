import {
        ref,
        set
} from "firebase/database"
import {
        realTimeDatabase
} from "."

export const setData = async (dataref, data) => {
        const dataset = (await set(ref(realTimeDatabase, dataref), data))
        return dataset;
}
import { get, ref } from "firebase/database"
import { appAuth } from "."
import { realTimeDatabase } from "."

export const getData = async (dataref) => {
    const data = await get(ref(realTimeDatabase, dataref))
    return data
}
export const loginUser = async () => { 
    const loginUser = localStorage.getItem("uid")
    if (loginUser) {
        const user = (await getData(`users/${loginUser}`)).val()
        return user;
    } else {
        return false;
    }
}   
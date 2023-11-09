import { StateStorage, createJSONStorage } from "zustand/middleware"

const firebaseUrl = 'https://zustand-storage-fh-default-rtdb.firebaseio.com/zustand'


const storageAPI: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        // eslint-disable-next-line no-useless-catch
        try {
            const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json())

            return JSON.stringify(data)
        } catch (error) {
            throw error

        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        await fetch(`${firebaseUrl}/${name}.json`, {
            method: 'PUT',
            body: value
        }).then(res => res.json())

    },
    removeItem: function (name: string): void | Promise<void> {
        console.log(name)
    }
}

export const firebaseStorage = createJSONStorage(() => storageAPI)
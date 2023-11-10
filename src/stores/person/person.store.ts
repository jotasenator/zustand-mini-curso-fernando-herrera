import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware';
// import { customSessionStorage } from '../storages/session.storage';
import { firebaseStorage } from '../storages/firebase.storage';

type PersonState = {
    firstName: string;
    lastName: string;
}

type Actions = {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions, [['zustand/devtools', never]]> = (set) => ({

    firstName: '',
    lastName: '',
    setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
    setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),

})



export const usePersonStore = create<PersonState & Actions>()(
    // devtools(
    persist(
        storeAPI
        , {
            name: 'person-storage',
            storage: firebaseStorage
        })
)
// )
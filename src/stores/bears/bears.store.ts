import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type Bear = {
    id: number;
    name: string;
}

type BearState = {
    blackBears: number;
    polarBears: number;
    pandaBears: number;

    bears: Bear[];


    //with the persist middleware computed is no longer valid and totalBears must be a function returning a number
    // computed: {
    //     totalBears: number;
    // }
    totalBears: () => number;

    increaseBlackBears: (by: number) => void;
    increasePandaBears: (by: number) => void;
    increasePolarBears: (by: number) => void;

    doNothing: () => void;
    addBears: () => void;
    clearBears: () => void;

}



export const useBearStore = create<BearState>()(
    persist((set, get) => ({
        blackBears: 10,
        polarBears: 5,
        pandaBears: 1,

        bears: [{ id: 1, name: 'Oso No 1' }],

        // computed: {
        //     get totalBears() {
        //         return get().blackBears + get().pandaBears + get().polarBears + get().bears.length
        //     }
        // },
        totalBears: () => {
            return get().blackBears + get().pandaBears + get().polarBears + get().bears.length
        },

        increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
        increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
        increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

        doNothing: () => set(state => ({ bears: [...state.bears] })),
        addBears: () => set(state => ({
            bears: [...state.bears, { id: state.bears.length + 1, name: `Oso No${state.bears.length + 1}` }]
        })),
        clearBears: () => set(({ bears: [] })),
    }), {
        name: 'bears-storage'
    })
)


import { create } from "zustand"

type ModalStore = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const userModalStore = create<ModalStore>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),

}))

export default userModalStore
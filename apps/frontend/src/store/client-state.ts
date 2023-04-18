import { Modal } from "@/modal/modal";
import { atom } from "jotai";

export const modalAtom = atom<Modal | null>(null);
export const titleAtom = atom<string | null>(null);
export const isMobileAtom = atom(false);
export const isDrawerShownAtom = atom(false);

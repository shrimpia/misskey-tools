import { Modal } from "@/modal/modal";
import { atom, useAtom } from "jotai";

export const modal = atom<Modal | null>(null);
export const title = atom<string | null>(null);
export const isMobile = atom(false);
export const isDrawerShown = atom(false);


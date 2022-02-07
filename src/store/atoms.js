import { atom } from "jotai";
import { izzy } from "../izzy";
import { defaultBrush } from "../izzy/Brush";


const baseBrushAtom = atom(defaultBrush)
export const brushAtom = atom(
    get => get(baseBrushAtom),
    (get, set, value) => {
        set(baseBrushAtom, value)
        izzy.setBrush(() => get(baseBrushAtom)) // Make sure izzy stays consistent with atom state
    }
)
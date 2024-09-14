import { createContext } from "react";


type OpenAiContextType = {
    key:string|null
    setKey:(key:string)=>void
}
export const OpenAiContext = createContext<OpenAiContextType>({
    key:null,
    setKey:()=>{}
})
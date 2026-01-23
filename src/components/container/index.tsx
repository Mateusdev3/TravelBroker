import type { ReactNode } from "react"

export function Container({children}: {children:ReactNode}){
    return(
        <div className="w-full h-[calc(100vh-48px)] max-w-11/12 px-4 flex justify-center flex-col mx-auto">
             {children}
        </div>
    )
        
       
}

interface InputProps{
    type: string;
    placeholder: string;
    name: string;
    value: string;
    change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({type, placeholder, name, value, change}: InputProps){
    
    return(
        <input className="border-2 min-w-6/12 bg-white rounded-md h-9 px-2 border-gray-100 shadow-md"
         type={type} placeholder={placeholder} name={name} value={value} onChange={change}  />
    )
}
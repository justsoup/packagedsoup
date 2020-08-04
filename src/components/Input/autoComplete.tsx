import React, {useState,ChangeEvent, ReactElement} from 'react'
import Input,{InputProps} from '../Input/input'

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
    fetchSuggestion:(str:string)=>string[];
    onSelect?:(item:string)=>void;
    renderOption?:(item:string)=>ReactElement;  //custom template

}
export const AutoComplete:React.FC<AutoCompleteProps>=(props)=>{
    const {
        fetchSuggestion,
        onSelect,
        value,
        renderOption,
        ...restProps
    }=props

    const [inputValue,setInputValue]=useState(value)
    const [suggestions,setSuggestions]=useState<string[]>([])
    console.log(suggestions);

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value.trim()
        setInputValue(value)
        if(value){
            const results=fetchSuggestion(value)
            setSuggestions(results)
        }else{
            setSuggestions([])
        }
    }

    const renderTemplate=(item:string)=>{
        return renderOption? renderOption(item):item
    }

    const generateDropDown=()=>{
        return (
            <ul>
                {suggestions.map((item,index)=>{
                    return (
                        <li key={index} onClick={()=>{
                            setInputValue(item)
                            setSuggestions([])
                            if(onSelect){
                                onSelect(item)
                            }
                        }}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className="auto-complete">
            <Input 
                value={inputValue}
                onChange={handleChange}
                {...restProps}
            />
            {suggestions.length>0? generateDropDown():null}
        </div>
    )
}
AutoComplete.defaultProps={
    value:'',
    icon:'search',
}

export default AutoComplete
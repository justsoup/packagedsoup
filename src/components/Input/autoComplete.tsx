import React, {useState,ChangeEvent,KeyboardEvent, ReactElement} from 'react'
import Input,{InputProps} from '../Input/input'
import classNames from 'classnames'

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
    const [highlightIndex,setHighlightIndex]=useState(-1)
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

    const hightlight=(index:number)=>{
        if(index<0){
            index=suggestions.length-1
        }
        if(index>=suggestions.length){
            index=0
        }
        setHighlightIndex(index)
    }

    const hangdleKeyDown=(e:KeyboardEvent<HTMLInputElement>)=>{
        switch(e.keyCode){
            case 13:
                if(suggestions[highlightIndex]){
                    setInputValue(suggestions[highlightIndex])
                    setSuggestions([])
                    setHighlightIndex(0)
                }
                break;
            case 38:
                hightlight(highlightIndex-1)
                break;
            case 40:
                hightlight(highlightIndex+1)
                break;
            case 27:
                setSuggestions([])
                break;
            default:
                break;
        }
    }

    const renderTemplate=(item:string)=>{
        return renderOption? renderOption(item):item
    }

    const generateDropDown=()=>{
        return (
            <ul>
                {suggestions.map((item,index)=>{
                    const light=classNames("suggestion-item",{
                            "item-highlighted":index===highlightIndex
                        })
                    return (
                        <li 
                        key={index} 
                        className={light}
                        onClick={()=>{
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
                onKeyDown={hangdleKeyDown}
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
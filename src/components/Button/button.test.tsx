import React from 'react'
import {render} from '@testing-library/react'
import Button from './button'
const defaultProps={
    onClick:jest.fn()
}

describe('test Button component',()=>{
    it('show render the correct default button',()=>{
    const wrapper=render(<Button {...defaultProps}>Nice</Button>)
        const element=wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        // fireEvent.click(element)
        // expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('show render the correct default button',()=>{

    })
    it('show render the correct default button',()=>{
        
    })
    it('show render the correct default button',()=>{
        
    })
    it('show render the correct default button',()=>{
        
    })
})
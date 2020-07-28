import React from 'react'
import {render, RenderResult, fireEvent,cleanup} from '@testing-library/react'
import Menu,{MenuProps} from './menu'
import MenuItem from './menuItem'

// const testProps:MenuProps={
//     mode: 'horizontal',
//     defaultIndex:0,
//     onSelect:jest.fn(),
//     className:'test'
// }
// const testVerProps:MenuProps={
//     mode: 'vertical',
//     defaultIndex: 0,
//     onSelect: jest.fn(),
//     className: 'test'
// }

// const generateMenu = (props: MenuProps) => {
//     return (
//         <Menu {...props}>
//         <MenuItem index={0}>
//           active
//         </MenuItem>
//         <MenuItem index={1} disabled>
//           disabled
//         </MenuItem>
//         <MenuItem index={2}>
//           xyz
//         </MenuItem>
//         </Menu>
//     );
// }

// let wrapper: RenderResult,
//     wrapper2: RenderResult,
//     menuElement: HTMLElement,
//     activeElement: HTMLElement,
//     disabledElement: HTMLElement;

// describe('test Menu and MenuItem component',()=>{
//     beforeEach(()=>{
//         wrapper=render(generateMenu(testProps))
//         menuElement=wrapper.getByTestId('testid')
//         activeElement=wrapper.getByText('active')
//         disabledElement=wrapper.getByText('disabled')

//     })
//     //通用执行函数
//     it('should render correct Menu and MenuItem based on default props',()=>{
//         expect(menuElement).toBeInTheDocument
//         expect(menuElement).toHaveClass('menu test')
//         expect(menuElement.getElementsByTagName('li').length).toEqual(3)
//         expect(activeElement).toHaveClass('menu-item active')
//         expect(disabledElement).toHaveClass('menu-item disabled')

//     }),
//     it('should render vertical mode when mode is set to vertical', () => {
//         const thirdItem = wrapper.getByText('xyz');
//         fireEvent.click(thirdItem);
//         expect(thirdItem).toHaveClass('active');
//         expect(activeElement).not.toHaveClass('menu-item active');
//         expect(testProps.onSelect).toHaveBeenLastCalledWith(2);

//         fireEvent.click(disabledElement); 
//         expect(disabledElement).not.toHaveClass('active');
//         expect(testProps.onSelect).not.toHaveBeenLastCalledWith(1);
//     });
//     it('should render vertical mode when mode is set to vertical', () => {
//         cleanup();
//         wrapper2 = render(generateMenu(testVerProps));
//         const menuElement = wrapper2.getByTestId('testid'); 
//         expect(menuElement).toHaveClass('menu test');
//     });
// })
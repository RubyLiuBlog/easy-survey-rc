import React, { createContext, ReactNode, useState } from 'react'
import classnames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'vertical' | 'horizontal'

export interface MenuProps{
  defaultIndex?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: string) => void;
  defaultOpenSubMenus?: string[];
  className?: string;
}

interface MenuContextProps {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<MenuContextProps>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
  const {mode, style, onSelect, children, defaultIndex,defaultOpenSubMenus, className } = props
  const [currentActive, setCurrentActive] = useState(defaultIndex)

  const classes = classnames('menu-wrapper', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  })

  const handleClick = (index: string) => {
    setCurrentActive(index)
    onSelect && onSelect(index)
  }

  const initContextValue: MenuContextProps = {
    index: currentActive || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return React.Children.map(children,(child,index)=> {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }

  return(
    <ul className={classes} style={style}>
      <MenuContext.Provider value={initContextValue}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: '0'
}
export default Menu

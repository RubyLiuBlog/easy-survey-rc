import React, { useState, useEffect, createContext, useContext } from 'react';
import classnames from 'classnames';

const Input = (props) => {
    const { value, type, className, disabled, rows, onChange, min, max, defaultValue, style } = props;
    const [inputValue, setInputValue] = useState(type === 'number' ? 0 : '');
    useEffect(() => {
        defaultValue && setInputValue(defaultValue);
    }, [defaultValue]);
    useEffect(() => {
        value && setInputValue(value);
    }, [value]);
    const classes = classnames('input-wrapper', className);
    const handleChange = (v) => {
        onChange && onChange(v);
        setInputValue(v);
    };
    const renderInput = (t) => {
        switch (t) {
            case 'number': {
                return (React.createElement("input", { type: 'number', min: min || 0, max: max || 100, onChange: (e) => handleChange(e.target.value), disabled: disabled, value: inputValue, style: style }));
            }
            case 'textArea': {
                return (React.createElement("textarea", { onChange: (e) => handleChange(e.target.value), disabled: disabled, rows: rows, value: inputValue, style: style }));
            }
            default: {
                return (React.createElement("input", { type: 'text', disabled: disabled, value: inputValue, style: style }));
            }
        }
    };
    return (React.createElement("div", { className: classes }, renderInput(type || 'text')));
};
Input.defaultProps = {
    value: '',
    step: 1,
    disabled: false
};

const MenuContext = createContext({ index: '0' });
const Menu = (props) => {
    const { mode, style, onSelect, children, defaultIndex, defaultOpenSubMenus, className } = props;
    const [currentActive, setCurrentActive] = useState(defaultIndex);
    const classes = classnames('menu-wrapper', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizontal'
    });
    const handleClick = (index) => {
        setCurrentActive(index);
        onSelect && onSelect(index);
    };
    const initContextValue = {
        index: currentActive || '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    };
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style },
        React.createElement(MenuContext.Provider, { value: initContextValue }, renderChildren())));
};
Menu.defaultProps = {
    mode: 'horizontal',
    defaultIndex: '0'
};

const MenuItem = (props) => {
    const { index, disabled, className, style, children } = props;
    const context = useContext(MenuContext);
    const classes = classnames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';

const TransMenu = Menu;
TransMenu.Item = MenuItem;

export { Input, TransMenu as Menu };

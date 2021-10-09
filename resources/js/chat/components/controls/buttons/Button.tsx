import React from 'react';

import './Button.scss';

interface IProps {
  children: string,
}

const Button: React.FC<IProps> = ({children}) => {
    return (
        <>
            <button className="primary-button">{ children }</button>
        </>
    );
}

export default Button;

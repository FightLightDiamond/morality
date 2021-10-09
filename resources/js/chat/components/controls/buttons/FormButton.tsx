import React, {Component} from 'react';

import './Button.scss';

interface IProps {
  children: string,
  disabled: boolean
}

const FormButton: React.FC<IProps> = ({children, disabled}: IProps) => {
    return (
        <>
            <button
                type="submit"
                className="primary-button"
                disabled={disabled}>{ children }</button>
        </>
    );
}

export default FormButton;

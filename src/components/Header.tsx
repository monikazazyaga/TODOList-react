import React from 'react';

const Header: React.FC = () => {
    return (
        <div className="header">
            <img src="/icon.png" alt="Иконка" />
            <h1 className="title">Список дел</h1>
        </div>
    );
};

export default Header;
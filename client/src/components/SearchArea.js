import React from 'react';

function searchArea(props) {
    return (
        <div className="search-area">
            <input onChange={() => onChangeHandler} type="text"/>
        </div>
    );
}

const onChangeHandler = () => {
    
}

export default searchArea;
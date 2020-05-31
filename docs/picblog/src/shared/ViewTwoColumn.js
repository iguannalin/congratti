import React from 'react';
import '../App.css';

function ViewTwoColumn(props) {
    return (
        <div className="View-Two-Column">
            { props.photos.map((photo) => {
                return <p>{photo}</p>
            }) }
        </div>
    );
}

export default ViewTwoColumn;

import React from 'react';

function EcaPage (location) {
    return (
    <h1>React Page {location.match.params.id}</h1>
    )
}

export default EcaPage;
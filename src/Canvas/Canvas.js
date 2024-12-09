import React from 'react';

const Canvas = ({ playing }) => {
    const height = playing ? '100vh' : '0';
    const width = playing ? '100vw' : '0';

    return (
        <canvas
            className="gameCanvas"
            id="gameCanvas"
            style={{ height: height, width: width }}
        />
    );
};

export default Canvas;
import React, { useState, useEffect } from "react";
import './Infobar.css';


function Infobar({selectedItems2}) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleInfobar() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        console.log(selectedItems2);
    }, [selectedItems2]);

    return (
        <div className={`infobar ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleInfobar}>Information Selection</button>
            <div className="infobar-content">
                {/* ... sidebar content */}
            </div>
        </div>
    );
}

export default Infobar;
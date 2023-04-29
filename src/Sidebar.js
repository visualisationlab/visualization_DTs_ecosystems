import React, { useState, useEffect } from "react";
import './Sidebar.css';
import Select from 'react-select';
import graph_data from "./data.json";

// Data Types
const options = graph_data.data_type;
const options2 = graph_data.visualization_technique;
const options3 = graph_data.visualization_tool;

function Sidebar({ sendOptions, sendToggleEdges }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    function callsendOptions(changed, value) {
        // value 1: data type change,
        // value 2: visualization technique change
        // value 3: visualization tool change
        console.log(changed)
        if (value == 1) {
            sendOptions([...changed, ...selectedOptions2.map((item) => ({ value: item, label: item })), ...selectedOptions3.map((item) => ({ value: item, label: item }))])
        } else if (value == 2) {
            sendOptions([...selectedOptions.map((item) => ({ value: item, label: item })), ...changed, ...selectedOptions3.map((item) => ({ value: item, label: item }))])
        } else if (value == 3) {
            sendOptions([...selectedOptions.map((item) => ({ value: item, label: item })), ...selectedOptions2.map((item) => ({ value: item, label: item })), ...changed])
        }

    }
    //================
     // Data Types
    // Used specifically to show what is selected on the multiselect
    const [selectedOptions, setSelectedOptions] = useState([]);
    // select all state
    const [selectAllState, setSelectAllState] = useState(false);
    const [toggleEdgesState, setToggleEdgesState] = useState(false);
    useEffect(() => {
        if (selectAllState == true) {
            setSelectedOptions(options.map((option) => option.value));
            callsendOptions(options, 1)
        }
        else {
            setSelectedOptions([]);
            // It immediately hides all for this
            callsendOptions([], 1)
        }
    }, [selectAllState]);

    const handleSelectAll = () => {
        setSelectAllState(!selectAllState)
    };

    function handleSelectChange(selectedOptions) {
        setSelectedOptions(selectedOptions.map((option) => option.value));
        callsendOptions(selectedOptions, 1)
    }

    // Handle toggle edges of same category
    function handleToggleEdges() {
        setToggleEdgesState(!toggleEdgesState)
        sendToggleEdges(["data_type", toggleEdgesState])
    }
    //===================


    // Visualization Techniques
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    // select all state
    const [selectAllState2, setSelectAllState2] = useState(false);
    const [toggleEdgesState2, setToggleEdgesState2] = useState(false);

    useEffect(() => {
        if (selectAllState2 == true) {
            setSelectedOptions2((options2.flatMap(tool => tool.options)).map((option) => option.value));
            callsendOptions(options2.flatMap(tool => tool.options), 2)
        }
        else {
            setSelectedOptions2([]);
            // It immediately hides all for this
            callsendOptions([], 2)
        }
    }, [selectAllState2]);

    const handleSelectAll2 = () => {
        setSelectAllState2(!selectAllState2)
    };

    function handleSelectChange2(selectedOptions2) {
        setSelectedOptions2(selectedOptions2.map((option) => option.value));
        callsendOptions(selectedOptions2, 2)
    }

    // Handle toggle edges of same category
    function handleToggleEdges2() {
        setToggleEdgesState2(!toggleEdgesState2)
        sendToggleEdges(["visualization_technique", toggleEdgesState2])
    }

    //===================
    // Visualization Tools
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    const [selectAllState3, setSelectAllState3] = useState(false);
    const [toggleEdgesState3, setToggleEdgesState3] = useState(false);
    useEffect(() => {
        if (selectAllState3== true) {
            setSelectedOptions3((options3.flatMap(tool => tool.options)).map((option) => option.value));
            callsendOptions(options3.flatMap(tool => tool.options), 3)
        }
        else {
            setSelectedOptions3([]);
            // It immediately hides all for this
            callsendOptions([], 3)
        }
    }, [selectAllState3]);

    const handleSelectAll3 = () => {
        setSelectAllState3(!selectAllState3)
    };

    function handleSelectChange3(selectedOptions3) {
        setSelectedOptions3(selectedOptions3.map((option) => option.value));
        callsendOptions(selectedOptions3, 3)
    }

    // Handle toggle edges of same category
    function handleToggleEdges3() {
        setToggleEdgesState3(!toggleEdgesState3)
        sendToggleEdges(["visualization_tool", toggleEdgesState3])
    }

    const ReactSelectStyles = () => ({
        multiValueLabel: (styles: any) => ({
            ...styles,
            whiteSpace: "normal",
            fontSize: '10px',
        }),
    })


    return (
        <div>
         <button className="button" onClick={toggleSidebar}>Graph Options</button>

        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar-content">
                    <br></br>
                    <br></br>
                    <hr></hr>
                <p className="title" > Choose data type(s)</p>
                    <hr></hr>
                    <Select
                        options={options}
                        isMulti={true}
                        isSerachable={true}
                        placeholder="Select or search for data type(s)"
                        value={selectedOptions.map((item) => ({ value: item, label: item }))}
                        onChange={handleSelectChange}
                        styles={ReactSelectStyles()}
                />
                <br></br>
                <label className="checkbox" >
                        <input type="checkbox" checked={selectedOptions.length === options.length} onChange={handleSelectAll} />
                    Select All
                    </label>
                    <label className="checkbox" >
                        <input type="checkbox" checked={toggleEdgesState} onChange={handleToggleEdges} />
                        Display Edges Between Data Types
                    </label>
                    <br></br>
                    <hr></hr>
                <p className="title" > Choose visualization technique(s)</p>
                    <hr></hr>
                    <Select
                    options={options2}
                    isMulti={true}
                    isSerachable={true}
                    placeholder="Select or search for visualization technique(s)"
                    value={selectedOptions2.map((item) => ({ value: item, label: item }))}
                    onChange={handleSelectChange2}
                    styles={ReactSelectStyles()}
                />

                <br></br>
                <label className="checkbox" >
                        <input type="checkbox" checked={selectedOptions2.length === (options2.flatMap(tool => tool.options)).map((option) => option.value).length} onChange={handleSelectAll2} />
                    Select All
                    </label>
                    <label className="checkbox" >
                        <input type="checkbox" checked={toggleEdgesState2} onChange={handleToggleEdges2} />
                        Display Edges Between Visualization Techniques
                    </label>
                    <br></br>
                    <hr></hr>
                <p className="title"> Choose visualization tool(s)</p>
                    <hr></hr>
                    <Select
                    options={options3}
                    isMulti={true}
                    isSerachable={true}
                    placeholder="Select or search for visualization tool(s)"
                    value={selectedOptions3.map((item) => ({ value: item, label: item }))}
                        onChange={handleSelectChange3}
                        styles={ReactSelectStyles()}
                />

                <br></br>
                <label className="checkbox" >
                        <input type="checkbox" checked={selectedOptions3.length === (options3.flatMap(tool => tool.options)).map((option) => option.value).length} onChange={handleSelectAll3} />
                    Select All
                    </label>
                    <label className="checkbox" >
                        <input type="checkbox" checked={toggleEdgesState3} onChange={handleToggleEdges3} />
                        Display Edges Between Visualization Tools
                    </label>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
            </div>
        </div>
    );
}

export default Sidebar;

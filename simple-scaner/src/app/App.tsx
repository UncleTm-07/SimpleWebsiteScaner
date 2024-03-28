import React from 'react';
import './index.css'
import {Routing} from "../pages";
import {withProviders} from "./provider";

const App = () => {
    return (
        <>
            <Routing/>
        </>
    );
};

export default withProviders(App);
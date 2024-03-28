import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {RouterNames} from "../shared/enums/RouterNames";
import HomePage from "./HomePage.tsx";
import ResultPage from "./ResultPage.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

export const Routing = () => {
    return (
        <Routes>
            <Route path={RouterNames.HOME.to} element={<HomePage/>}/>
            <Route path={RouterNames.RESULT.to} element={<ResultPage/>}/>

            <Route path={RouterNames.NOT_FOUND.to} element={<NotFoundPage/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};
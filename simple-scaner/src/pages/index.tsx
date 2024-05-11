import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {RouterNames} from "../shared/enums/RouterNames";
import HomePage from "./HomePage.tsx";
import ResultPage from "./ResultPage.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import zcu_ico from "@/assets/ico/zcu.png";
import {Button} from "@/components/ui/button.tsx";
import MainPage from "@/pages/MainPage.tsx";
import RisksPage from "@/pages/RisksPage.tsx";

export const Routing = () => {
    return (
        <Routes>
            <Route path={RouterNames.HOME.to} element={<HomePage/>}/>

            <Route element={<MainPage/> } >
                <Route path={RouterNames.SCANS.to} element={<ResultPage/>}/>
                <Route path={RouterNames.RISKS.to} element={<RisksPage/>}/>
            </Route>


            <Route path={RouterNames.NOT_FOUND.to} element={<NotFoundPage/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};
import React from 'react';
import { HashRouter, Route, Navigate, Routes } from 'react-router-dom';
import Login from '../views/login/Login';
import NewsSandBox from '../views/sandbox/NewsSandBox';
import UserList from '../views/sandbox/user-manage/UserList';
import RoleList from '../views/sandbox/right-manage/RoleList';
import RightList from '../views/sandbox/right-manage/RightList';
import Home from '../views/sandbox/home/Home';
import NotFound from '../views/NotFound';

export default function IndexRouter() {
    function isAuth() {
        const isAuth = localStorage.getItem('token');
        console.log('check isauth', isAuth);
        return isAuth;
    }

    return (
        <HashRouter>
            <Routes>
                {/* Public Routes */}
                <Route path='/login' element={<Login />} />

                {/* Protected Routes */}
                <Route
                    path='/'
                    element={isAuth() ? <NewsSandBox /> : <Navigate to='/login' />}
                >
                    {/* Nested Routes inside NewsSandBox */}
                    <Route path='home' element={<Home />} />
                    <Route path='user-manage/list' element={<UserList />} />
                    <Route path='right-manage/role/list' element={<RoleList />} />
                    <Route path='right-manage/right/list' element={<RightList />} />
                </Route>

                {/* Fallback Routes */}
                <Route path='*' element={<NotFound />} />
            </Routes>
        </HashRouter>
    );
}
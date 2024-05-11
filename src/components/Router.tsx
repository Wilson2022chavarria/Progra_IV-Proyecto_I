import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

const Admin = React.lazy(() => import('../pages/admin/Admin'));
const Home = React.lazy(() => import('../pages/home/Home'));
const ProductDetail = React.lazy(() => import('../pages/product-detail/ProductDetail'));
const Login = React.lazy(() => import('../pages/login/Login'));
const PrivateRoute = React.lazy(() => import('./PrivateRoute'));

const Router: React.FC = () => (
  <Routes>
    <Route element={<Home />} path="/" />
    <Route element={<ProductDetail />} path="/detail/:productId" />
    <Route element={<PrivateRoute element={<Admin />} />} path="/admin" />
    <Route element={<Login />} path="/login" />
  </Routes>
);

export default Router;

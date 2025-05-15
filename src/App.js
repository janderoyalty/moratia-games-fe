import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NaviBar from "./components/layout/NaviBar";
import AdminNavBar from "./admin/components/AdminNavBar";

import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import WorldPage from "./pages/WorldPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";

import SignIn from "./admin/SignIn";
import ProtectedRoute from "./admin/ProtectedRoute";
import UpdateForm from "./admin/UpdateForm";
import UpdateEntriesList from "./admin/UpdateEntriesList";
import URLs from "./admin/URLs";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<BrowserRouter>
			<ContentRouter />
		</BrowserRouter>
	);
}

function ContentRouter() {
	const location = useLocation();
	const isAdminPath = location.pathname.startsWith("/admin");

	return (
		<div className="App">
			{isAdminPath ? <AdminNavBar /> : <NaviBar />}

			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<LandingPage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/world" element={<WorldPage />} />
				<Route path="/gallery" element={<GalleryPage />} />
				<Route path="/about" element={<AboutPage />} />

				{/* Admin Routes */}
				{process.env.REACT_APP_ADMIN_ENABLED === "true" && (
					<>
						<Route path="/signin" element={<SignIn />} />
						<Route
							path="/update"
							element={
								<ProtectedRoute>
									<UpdateForm />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/update_list"
							element={
								<ProtectedRoute>
									<UpdateEntriesList />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/urls"
							element={
								<ProtectedRoute>
									<URLs />
								</ProtectedRoute>
							}
						/>
					</>
				)}
			</Routes>
		</div>
	);
}

export default App;

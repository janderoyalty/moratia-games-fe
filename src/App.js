import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NaviBar from "./components/layout/NaviBar";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import WorldPage from "./pages/WorldPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import SignIn from "./admin/SignIn";
import ProtectedRoute from "./admin/ProtectedRoute";
import UpdateEntriesList from "./admin/UpdateEntriesList";
import UpdateForm from "./admin/UpdateForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<NaviBar />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/products" element={<ProductsPage />} />
					<Route path="/world" element={<WorldPage />} />
					<Route path="/gallery" element={<GalleryPage />} />
					<Route path="/about" element={<AboutPage />} />

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
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;

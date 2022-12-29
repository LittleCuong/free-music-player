import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from "./layouts/MainLayout/MainLayout";
import { publicRoutes } from './routes/routes.js';
import grid from './assets/GridSystem/grid.css'


function App() {
  return (
        <Router>
            <div 
                className="App"
                style={{height: '100vh',
                        backgroundColor: '#3B3C60'
                }}
            >
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = MainLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        //chuyển component thành element
                        const Page = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page/>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
  )
}

export default App;

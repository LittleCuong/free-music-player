import config from '../config/config';
import CategoryLayout from '../layouts/CategoryLayout/CategoryLayout';
import PlaylistLayout from '../layouts/PlaylistLayout/PlaylistLayout';
import CategoryPage from '../pages/CategoryPage/CategoryPage';

// Components
import Home from '../pages/Home/Home.js';
import PlaylistPage from '../pages/PlaylistPage/PlaylistPage';

const publicRoutes = [
    { path: config.routes.home, component: Home},
    { path: config.routes.category, component: CategoryPage, layout: CategoryLayout },
    { path: config.routes.playlist, component: PlaylistPage, layout: PlaylistLayout },
]

export { publicRoutes };

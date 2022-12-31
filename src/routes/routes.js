import config from '../config/config';
import CategoryLayout from '../layouts/CategoryLayout/CategoryLayout';
import CategoryListLayout from '../layouts/CategoryListLayout/CategoryListLayout';
import PlaylistLayout from '../layouts/PlaylistLayout/PlaylistLayout';
import CategoryPage from '../pages/CategoryPage/CategoryPage';
import DiscoverPage from '../pages/DiscoverPage/DiscoverPage';

// Components
import Home from '../pages/Home/Home.js';
import PlaylistPage from '../pages/PlaylistPage/PlaylistPage';

const publicRoutes = [
    { path: config.routes.home, component: Home},
    { path: config.routes.categories, component: DiscoverPage, layout: CategoryListLayout },
    { path: config.routes.category, component: CategoryPage, layout: CategoryLayout },
    { path: config.routes.playlist, component: PlaylistPage, layout: PlaylistLayout },
]

export { publicRoutes };

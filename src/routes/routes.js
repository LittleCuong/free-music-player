import config from '../config/config';

import CategoryLayout from '../layouts/CategoryLayout/CategoryLayout';
import CategoryListLayout from '../layouts/CategoryListLayout/CategoryListLayout';
import FavouritesLayout from '../layouts/FavouritesLayout/FavouritesLayout';
import PlaylistLayout from '../layouts/PlaylistLayout/PlaylistLayout';
import FavouriteListLayout from "../layouts/FavouriteListlayout/FavouriteListLayout";


import CategoryPage from '../pages/CategoryPage/CategoryPage';
import DiscoverPage from '../pages/DiscoverPage/DiscoverPage';
import FavouritesPage from '../pages/FavouritesPage/FavouritesPage';

// Components
import Home from '../pages/Home/Home.js';
import PlaylistPage from '../pages/PlaylistPage/PlaylistPage';
import FavouritesPlaylistsPage from '../pages/FavouritesPlaylistsPage/FavouritesPlaylistsPage';
import artistDetailPage from '../pages/ArtistDetailPage/DiscoverPage';
import ArtistDetailLayout from '../layouts/ArtistDetailLayout/ArtistDetailLayout';

const publicRoutes = [
    { path: config.routes.home, component: Home},
    { path: config.routes.categories, component: DiscoverPage, layout: CategoryListLayout },
    { path: config.routes.category, component: CategoryPage, layout: CategoryLayout },
    { path: config.routes.playlist, component: PlaylistPage, layout: PlaylistLayout },
    { path: config.routes.favourites, component: FavouritesPage, layout: FavouritesLayout },
    { path: config.routes.favouritesPlaylist, component: FavouritesPlaylistsPage, layout: FavouriteListLayout},
    { path: config.routes.artistDetail, component: artistDetailPage, layout: ArtistDetailLayout }
]

export { publicRoutes };

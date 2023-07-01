import { useEffect } from "react";
import { AlbumsList } from "../../components/albums/albumsList/AlbumsList";
import { Layout, RadioChangeEvent, Space } from 'antd';
import { useState } from "react";
import { Filters } from "../../components/posts/filters/Filters";
import { restoreFavoriteAlbums } from "../../components/albums/api/store/albumsSlice";
import { fetchgetAlbums } from "../../components/albums/api/store/fetchMethods";
import { displayedList } from "../../components/share/displayedList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const AlbumsPage = () => {
	const dispatch = useAppDispatch();
    const [selectedUserIds, setSelectedUserIds] = useState<Array<number>>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [onlyFavorite, setOnlyFavorite] = useState<boolean>(false)
    const [reversList, setReversList] = useState<boolean>(false)
    const [sortType, setSortType] = useState<number>(3);
	const { albums, users } = useAppSelector(state => state.albums)
	const favoriteAlbums = useAppSelector(state => state.albums.favoriteAlbums)

    const handleUserSelectChange = (selectedUserIds: Array<number>) => {
        setSelectedUserIds(selectedUserIds);
    };

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onSortChange = (e: RadioChangeEvent) => {
        setSortType(e.target.value);
      };

	const filteredAlbums = albums.filter(album => {
		const isTitleMatched = album.title.toLowerCase().includes(searchValue.toLowerCase());
		const isUserMatched = selectedUserIds.length === 0 || selectedUserIds.includes(album.userId);
		return isTitleMatched && isUserMatched;
	});

	const filteredList = onlyFavorite
		? filteredAlbums.filter(album => favoriteAlbums.hasOwnProperty(album.id) && favoriteAlbums[album.id])
		: filteredAlbums;

	useEffect(() => {
		dispatch(restoreFavoriteAlbums())
		if (!albums?.length) {
			dispatch(fetchgetAlbums())
		}
	}, [dispatch, albums]);

	return (
		<Layout>
			<Space direction="vertical" style={{ marginBottom: '12px', padding: '50px 25px 50px' }}>
				<Filters
					onChangeUser={handleUserSelectChange}
					onSearch={handleSearchChange}
					setOnlyFavorite={setOnlyFavorite}
					setReversList={setReversList}
					users={users}
					onSortChange={onSortChange}
					sortType={sortType}
				/>
				<AlbumsList
					albums={displayedList({list: filteredList, sortType, reversList})}
				/>
			</Space>
		</Layout>

	)
}

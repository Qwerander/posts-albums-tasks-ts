import { useEffect } from 'react'

import { useParams } from 'react-router-dom';
import { AlbumMini } from '../../components/album/albumMini/albumMini';
import { Layout, Space } from 'antd';
import { fetchGetPhotos } from '../../components/albums/api/store/fetchMethods';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const AlbumFotos = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams()
	const photos = useAppSelector(state => state.albums.photos[id])

	useEffect(() => {
		if (!photos) {
			dispatch(fetchGetPhotos())
		}
	}, [photos, dispatch, id])

	return (
		<Layout>
			<Space direction="vertical" style={{ marginBottom: '12px', padding: '50px 25px 50px' }}>
				<AlbumMini album={photos} />
			</Space>
		</Layout>
	)
}

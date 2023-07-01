import styles from './album.module.css'
import { List, Checkbox } from 'antd';
import { ReactComponent as DeleteSvg } from '../../../img/delete.svg'
import { ReactComponent as EditSvg } from '../../../img/edit.svg'
import { ReactComponent as FavoriteSvg } from '../../../img/favorite.svg'
import { useState } from 'react';
import { EditForm } from '../editForm/EditForm';
import { ModalConfirum } from '../../share/modalConfirum/ModalConfirum';
import { Link } from 'react-router-dom';
import { setFavotie } from '../api/store/albumsSlice';
import { fetchDeleteAlbum } from '../api/store/fetchMethods';
import { IAlbumWithUser } from '../api/apiTypes';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

interface IAlbumComponent {
	album: IAlbumWithUser
	checked: boolean
	onChange: (itemId: number) => (e: CheckboxChangeEvent ) => void
  }

export const Album = ({ album, checked, onChange }: IAlbumComponent) => {
	const dispatch = useAppDispatch();
	const [isEditMode, toggleIEditMode] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const isFavorite = useAppSelector(state => state.albums.favoriteAlbums[album.id])

	const handleFavoriteClick = () => {
		dispatch(setFavotie({ id: album.id, bool: !isFavorite }))
	};

	const deleteConfirum = () => {
		dispatch(fetchDeleteAlbum(album.id))
	}

	return (
		<>
			<List.Item
				className={styles.item}
				key={album.id}
				actions={[
					<EditSvg onClick={() => toggleIEditMode(prev => !prev)} style={isEditMode ? { fill: '#1677ff' } : {fill: ''}} />,
					<DeleteSvg onClick={() => setIsModalOpen(true)} />,
					<FavoriteSvg onClick={handleFavoriteClick} style={isFavorite ? { fill: '#1677ff' } : {fill: ''}} />,
				]}
			>
				<List.Item.Meta
					title={!isEditMode &&
						<Link className={styles.link} to={`${album.id}`}>
							{`${album.id}. ${album.title}`}
						</Link>}
				/>
				{isEditMode
					? <div className={styles.edit}>
						<EditForm
							id={album.id}
							title={album.title}
							author={album.user.name}
							close={toggleIEditMode}
						/>
					</div>
					: <p className={styles.author}>Author: {album.user?.name}</p>
				}
				<Checkbox
					checked={checked}
					onChange={(e) => onChange(album.id)(e)}
				>
					Checked
				</Checkbox>
			</List.Item>
			<ModalConfirum
				confirum={deleteConfirum}
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
			/>
		</>
	)
}

import styles from './post.module.css'
import { List, Checkbox } from 'antd';
import { ReactComponent as CommentsSvg } from '../../../img/comments.svg';
import { ReactComponent as DeleteSvg } from '../../../img/delete.svg'
import { ReactComponent as EditSvg } from '../../../img/edit.svg'
import { ReactComponent as FavoriteSvg } from '../../../img/favorite.svg'
import { useState } from 'react';
import { CommentsList } from '../comments/CommentsList';
import { EditForm } from '../editForm/EditForm';
import { ModalConfirum } from '../../share/modalConfirum/ModalConfirum';
import { setFavotie } from '../api/store/postsSlice';
import { IPostWithUser } from '../api/apiTypes';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchDeletePost, fetchGetComments } from '../api/store/fetchMethods';

interface IPostComponent {
  post: IPostWithUser
  checked: boolean
  onChange: (itemId: number) => (e: CheckboxChangeEvent ) => void
}

export const Post = ({ post, checked, onChange }: IPostComponent) => {
  const dispatch = useAppDispatch();
  const [isCommentsOpen, toggleIsCommentsOpen] = useState(false)
  const [isEditMode, toggleIEditMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isFavorite = useAppSelector(state => state.posts.favoritePosts[post.id])
  const comments = useAppSelector(state => state.posts.comments[post.id])

  const handleFavoriteClick = () => {
    dispatch(setFavotie({ id: post.id, bool: !isFavorite }))
  };

  const handleCommentsClick = () => {
    toggleIsCommentsOpen(prev => !prev)
    if (!comments?.length) {
      dispatch(fetchGetComments(post.id))
    }
  };

  const deleteConfirum = () => {
    dispatch(fetchDeletePost(post.id))
  }

  return (
    <>
      <List.Item
        className={styles.item}
        key={post.id}
        actions={[
          <CommentsSvg onClick={() => handleCommentsClick()} style={isCommentsOpen ? { stroke: '#1677ff' } : {stroke: ''}} />,
          <EditSvg onClick={() => toggleIEditMode(prev => !prev)} style={isEditMode ? { fill: '#1677ff' } : {fill: ''}} />,
          <DeleteSvg onClick={() => setIsModalOpen(true)} />,
          <FavoriteSvg onClick={handleFavoriteClick} style={isFavorite ? { fill: '#1677ff' } : {fill: ''}} />,
        ]}
      >
        <List.Item.Meta
          title={!isEditMode && `${post.id}. ${post.title}`}
        />
        {isEditMode ?
          <EditForm
            id={post.id}
            body={post.body}
            title={post.title}
            author={post.user.name}
            close={toggleIEditMode}
          />
          : <>
            <p>{post.body}</p>
            <p className={styles.author}>Author: {post.user?.name}</p>
          </>
        }
        <Checkbox
          checked={checked}
          onChange={(e) => onChange(post.id)(e)}
        >
          Checked
        </Checkbox>
        {(isCommentsOpen && comments) && <CommentsList comments={comments} />}
      </List.Item>
      <ModalConfirum
        confirum={deleteConfirum}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  )
}

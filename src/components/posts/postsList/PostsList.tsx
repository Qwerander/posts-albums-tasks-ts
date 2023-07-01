import { useState } from "react";
import { Post } from "../post/Post"
import { List } from 'antd';
import { useEffect } from "react";
import { ButtonsAction } from "../../share/buttonsAction/ButtonsAction";
import { fetchDeletePost } from "../api/store/fetchMethods";
import { setFavotie } from "../api/store/postsSlice";
import { IPostWithUser } from "../api/apiTypes";
import { useAppDispatch } from "../../../store/hooks";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface IPostsList {
    posts: IPostWithUser[]
}

interface ICheckedItems {
    [value: number]: boolean
}

export const PostsList = ({ posts }: IPostsList) => {
    const dispatch = useAppDispatch();
    const [pageSize, setPageSize] = useState<number>(10)
    const [checkedItems, setCheckedItems] = useState<ICheckedItems>({})
    const showButtonsAction = Object.values(checkedItems).some(value => value === true);

    const onChange = (itemId: number) => (e: CheckboxChangeEvent ) => {
        setCheckedItems({
            ...checkedItems,
            [itemId]: e.target.checked
        })
    };

    useEffect(() => {
        const checkedItemsFromStorage = JSON.parse(localStorage.getItem('checkedPosts')!)
        if (checkedItemsFromStorage) {
            setCheckedItems(checkedItemsFromStorage)
        }
        const pageSizeFromStorage = localStorage.getItem('postsPageSize')
        if (pageSizeFromStorage) {
            setPageSize(+pageSizeFromStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('postsPageSize', pageSize.toString())
        localStorage.setItem('checkedPosts', JSON.stringify(checkedItems))
    }, [checkedItems, pageSize])

    const filtredId = Object.keys(checkedItems).filter((key) => checkedItems[+key] === true)

    const deleteConfirum = () => {
        filtredId.forEach(id => {
            dispatch(fetchDeletePost(+id))
        })
        setCheckedItems({})
    }
    const handleFavotite = () => {
        filtredId.forEach(id => {
            dispatch(setFavotie({ id: +id, bool: true }))
        })
        setCheckedItems({})
    }

    return (
        <>
            <List
                header={<h1 style={{ fontSize: '36px', textAlign: 'center' }}>Posts</h1>}
                itemLayout="vertical"
                size={'small'}
                pagination={{
                    pageSize: pageSize,
                    showSizeChanger: true,
                    onShowSizeChange: (current, size) => setPageSize(size),
                    pageSizeOptions: ["10", "20", "50", "100"]
                }}
                dataSource={posts}
                renderItem={(post) => (
                    <Post
                        post={post}
                        checked={checkedItems[post.id]}
                        onChange={onChange}
                    />
                )}
            />
            {showButtonsAction &&
                <ButtonsAction
                    deleteConfirum={deleteConfirum}
                    handleFavotite={handleFavotite}
                />
            }
        </>
    )
}




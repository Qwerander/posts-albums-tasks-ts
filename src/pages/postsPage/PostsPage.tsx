import { useEffect, useState } from "react";
import { PostsList } from "../../components/posts/postsList/PostsList";
import { Button, Layout, RadioChangeEvent, Space } from 'antd';
import { restoreFavoritePosts } from "../../components/posts/api/store/postsSlice";
import { fetchGetPosts } from "../../components/posts/api/store/fetchMethods";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Filters } from "../../components/posts/filters/Filters";
import { AddNewPost } from "../../components/posts/modal/AddNewPost";
import { displayedList } from "../../components/share/displayedList";

export const PostsPage = () => {
    const dispatch = useAppDispatch();
    const [selectedUserIds, setSelectedUserIds] = useState<Array<number>>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [onlyFavorite, setOnlyFavorite] = useState<boolean>(false)
    const [reversList, setReversList] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [sortType, setSortType] = useState<number>(3);
    const { posts, users } = useAppSelector(state => state.posts)
    const favoritePosts = useAppSelector(state => state.posts.favoritePosts)

    const handleUserSelectChange = (selectedUserIds: Array<number>) => {
        setSelectedUserIds(selectedUserIds);
    };

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onSortChange = (e: RadioChangeEvent) => {
        setSortType(e.target.value);
      };

    const filteredPosts = posts.filter(post => {
        const isTitleMatched = post.title.toLowerCase().includes(searchValue.toLowerCase());
        const isUserMatched = selectedUserIds.length === 0 || selectedUserIds.includes(post.userId);
        return isTitleMatched && isUserMatched;
    });

    const filteredList = onlyFavorite
        ? filteredPosts.filter(post => favoritePosts.hasOwnProperty(post.id) && favoritePosts[post.id])
        : filteredPosts;

    useEffect(() => {
        dispatch(restoreFavoritePosts())
        if (!posts?.length) {
            dispatch(fetchGetPosts())
        }
    }, [dispatch, posts]);

    return (
        <Layout>
             <Space direction="vertical" style={{ marginBottom: '12px', padding: '50px 25px 50px' }}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    + Add new post
                </Button>
               <Filters
                    onChangeUser={handleUserSelectChange}
                    onSearch={handleSearchChange}
                    setOnlyFavorite={setOnlyFavorite}
                    setReversList={setReversList}
                    users={users}
                    onSortChange={onSortChange}
                    sortType={sortType}
                />
                <PostsList
                    posts={displayedList({list: filteredList, sortType, reversList})}
                />
            </Space>
               <AddNewPost
                isOpen={isModalOpen}
                setIsopen={setIsModalOpen}
            />
        </Layout>
    )
}

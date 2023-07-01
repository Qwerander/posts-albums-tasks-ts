import { useState } from "react";
import { List } from 'antd';
import { useEffect } from "react";
import { Album } from "../album/Album";
import { ButtonsAction } from "../../share/buttonsAction/ButtonsAction";
import { fetchDeleteAlbum } from "../api/store/fetchMethods";
import { setFavotie } from "../api/store/albumsSlice";
import { IAlbumWithUser } from "../api/apiTypes";
import { useAppDispatch } from "../../../store/hooks";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface IAlbumList {
    albums: IAlbumWithUser[]
}

interface ICheckedItems {
    [value: number]: boolean
}

export const AlbumsList = ({ albums }: IAlbumList) => {
    const dispatch = useAppDispatch();
    const [pageSize, setPageSize] = useState<number>(10)
    const [checkedItems, setCheckedItems] = useState<ICheckedItems>({})
    const showButtonsAction = Object.values(checkedItems).some(value => value === true);

    const onChange = (itemId: number) => (e: CheckboxChangeEvent) => {
        setCheckedItems({
            ...checkedItems,
            [itemId]: e.target.checked
        })
    };

    useEffect(() => {
        const checkedItemsFromStorage = JSON.parse(localStorage.getItem('checkedAlbums')!)
        if (checkedItemsFromStorage) {
            setCheckedItems(checkedItemsFromStorage)
        }
        const pageSizeFromStorage = localStorage.getItem('albumsPageSize')
        if (pageSizeFromStorage) {
            setPageSize(+pageSizeFromStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('albumsPageSize', pageSize.toString())
        localStorage.setItem('checkedAlbums', JSON.stringify(checkedItems))
    }, [checkedItems, pageSize])

    const filtredId = Object.keys(checkedItems).filter(key => checkedItems[+key] === true)

    const deleteConfirum = () => {
        filtredId.forEach(id => {
            dispatch(fetchDeleteAlbum(+id))
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
                header={<h1 style={{ fontSize: '36px', textAlign: 'center' }}>Albums</h1>}
                grid={{
                    gutter: 16,
                    column: 3,
                    xs: 1,
                    sm: 1,
                    md: 2,
                }}
                pagination={{
                    pageSize: pageSize,
                    onShowSizeChange: (current, size) => setPageSize(size),
                    pageSizeOptions: ["10", "20", "50", "100"]
                }}
                dataSource={albums}
                renderItem={(album) => (
                    <Album
                        album={album}
                        checked={checkedItems[album.id]}
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

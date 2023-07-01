import { Button, Space } from 'antd';
import { useState } from 'react';
import { ModalConfirum } from '../modalConfirum/ModalConfirum';

interface IButtonAction {
    deleteConfirum: () => void
    handleFavotite: () => void
}

export const ButtonsAction = ({ deleteConfirum, handleFavotite }: IButtonAction) => {
    const [isModalOpenDelete, setIsModalOpenDelet] = useState(false)
    const [isModalOpenFavorite, setIsModalOpenFavorite] = useState(false)

    return (
        <>
            <Space wrap>
                <Button type="primary" danger onClick={() => setIsModalOpenDelet(true)}>
                    Delete
                </Button>
                <Button type="dashed" onClick={() => setIsModalOpenFavorite(true)}>
                    To favorite
                </Button>
            </Space>
            <ModalConfirum
                confirum={deleteConfirum}
                isOpen={isModalOpenDelete}
                setIsOpen={setIsModalOpenDelet}
            />
            <ModalConfirum
                confirum={handleFavotite}
                isOpen={isModalOpenFavorite}
                setIsOpen={setIsModalOpenFavorite}
                okType={'primary'}
                okText={'Add to favotite'}
            />
        </>
    )
}

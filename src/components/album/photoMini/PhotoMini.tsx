import { List } from 'antd';
import { useState } from 'react';
import { ModalPhoto } from '../modalPhoto/ModalPhoto';
import { IPhoto } from '../../albums/api/apiTypes';

interface IPhotoMini {
    photo: IPhoto
}

export const PhotoMini = ({ photo }: IPhotoMini) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <List.Item
                key={photo.id}
            >
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <img src={photo.thumbnaiUrl} alt={photo.title} />
                    <p style={{ maxWidth: '150px' }} >{photo.title}</p>
                </div>
            </List.Item>
            <ModalPhoto
                isOpen={isModalOpen}
                url={photo.url}
                title={photo.title}
                setIsopen={setIsModalOpen}
            />
        </>
    );
};
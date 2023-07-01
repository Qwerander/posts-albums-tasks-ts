import { Button, List, Space } from 'antd';
import { PhotoMini } from "../photoMini/PhotoMini";
import { useNavigate } from 'react-router-dom';
import { PhotosType } from '../../albums/api/apiTypes';

interface IAlbumMini {
    album: PhotosType
}

export const AlbumMini = ({ album }: IAlbumMini) => {
    const navigate = useNavigate();

    return (
        <Space direction="vertical" style={{ marginBottom: 30 }}>
            <Button type="dashed" onClick={() => navigate(-1)}>
                Back to albums
            </Button>
            <List
                grid={{
                    gutter: 10,
                }}
                dataSource={album}
                renderItem={(photo) => (
                    <PhotoMini photo={photo} />
                )}
            />
        </Space>
    )
}




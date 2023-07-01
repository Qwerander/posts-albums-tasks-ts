import { IUser } from "../../posts/api/apiTypes"

// export interface IAlbum {
//     userId: number
//     id: number
//     title: string
// }

export interface IAlbumForRecive {
    userId?: number
    title?: string
}

export interface IAlbum extends Required<IAlbumForRecive> {
    id: number
}

export interface IAlbumWithUser extends IAlbum {
    user: IUser;
}

export type AlbumsType = Array<IAlbumWithUser>

export interface IFavoriteAlbums {
    [albumId: number]: boolean
}

export interface IPhoto {
    albumId: number
    id: number
    title: string
    url: string
    thumbnaiUrl: string
}

export type PhotosType = Array<IPhoto>

export interface IPhotosByAlbum {
    [albumId: number]: PhotosType;
  }
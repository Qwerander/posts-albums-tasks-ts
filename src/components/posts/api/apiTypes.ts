
export interface IUser {
    id: number
    name: string
    email: string
}

export type UsersType = Array<IUser>

export interface IPostForRecive {
    userId?: number
    title?: string
    body?: string
}

export interface IPost extends Required<IPostForRecive> {
    id: number
}

export interface IPostWithUser extends IPost {
    user: IUser;
  }

export type PostsType = Array<IPostWithUser>

export interface IComment {
    id: number
    postId: number
    name: string
    email: string
    body: string
}

export type CommentsType = Array<IComment>

export interface IComments {
    [postId: number]: CommentsType
}

export interface IFavoritePosts {
    [postId: number]: boolean
}

export interface IError {
    error: string 
} 
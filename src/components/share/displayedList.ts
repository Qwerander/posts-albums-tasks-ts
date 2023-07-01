import { IAlbumWithUser } from "../albums/api/apiTypes";
import { IPostWithUser } from "../posts/api/apiTypes";
import { ITodo } from "../todos/api/apiTypes";

type DisplayedListType = {
  list: IPostWithUser[] | IAlbumWithUser[] | ITodo[];
  sortType: number;
  reversList: boolean;
  todos?: boolean
};

export function displayedList<T extends IPostWithUser | IAlbumWithUser | ITodo>({ list, sortType, reversList }: DisplayedListType): T[] {
  let sortedList = [...list];


  switch (sortType) {
    case 1:
      sortedList = sortedList.sort((a, b) => +(a as ITodo).completed - +(b as ITodo).completed);
      break;
    case 2:
      sortedList = sortedList.sort((a, b) => +(b as ITodo).completed - +(a as ITodo).completed);
      break;
    case 3:
      sortedList = sortedList.sort((a, b) => a.id - b.id);
      break;
    case 4:
      sortedList = sortedList.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
  }

  const reversedList = [...sortedList].reverse();
  const displayedList = reversList ? reversedList : sortedList;

  return displayedList as T[];
}
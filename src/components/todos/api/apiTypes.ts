export interface ITodoForRecive {
    title?: string
    completed?: boolean
}

export interface ITodo extends Required<ITodoForRecive> {
    id: number
}


export type TodosType = Array<ITodo>
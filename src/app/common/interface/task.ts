export interface TaskBoard {
    _id: string,
    title: string,
    taskIds: Tasks[]
}

export interface Tasks {
    _id: string,
    title: string,
    assign: string,
    boardId: string,
    description: string
}

export interface TaskboardRequestResponse {
    Status: number,
    data: TaskBoard[],
    message: string
}

export interface TaskboardReq {
    title: string,
    userId: string
}

export interface UpdateTaskboardReq {
    title: string
}


export interface TaskboardCreateReqRes {
    Status: number,
    message: string
}

export interface CreateTaskReqRes {
    Status: number,
    message: string
}

export interface TaskGetByIdRes {
    Status: number,
    message: string,
    data: UpdateTask
}

export interface CreateTaskReq {
    title: string,
    description: string,
    assign: string,
    boardId: string
}

export interface UpdateTask {
    title: string,
    description: string,
    assign: string,
    boardId: string,
    _id: string
}

export interface DragDrop {
    previousBoardId: string,
    currentBoardId: string,
    taskId: string
}


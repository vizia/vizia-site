export interface PostMeta {
    date: string,
    title: string,
    landing_image: string
}

export interface Post {
    path: string,
    meta?: PostMeta
}

export interface FileMeta {
    order: number,
    show?: boolean
}

export interface File {
    file_name: string,
    path: string,
    link: string,
    is_dir: boolean,
    meta?: FileMeta,
    files: File[],
}
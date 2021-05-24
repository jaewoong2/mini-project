export type ElemConstructorType = {
    parent: HTMLElement | null,
    refName: keyof {
        [key in keyof HTMLElementTagNameMap]?: string | null;
    },
    className?: string
}

export type POST_TYPE = {
    id: string | number,
    title: string,
    description: string,
}

export type PROFILE_TYPE = {
    name: string,
    nickName: string,
    image: string,
}

export type API_TYPE = {
    id?: string | number,
    posts?: POST_TYPE[],
    profile?: PROFILE_TYPE
}

export type LOGIN_STATE_TYPE = {
    id: number,
    posts: POST_TYPE[],
    profile: PROFILE_TYPE
}
export type postsType = {
    id: number
    message: string
    likeCount: string
}
export type photosType = {
    small: string | null
    large: string | null
}
export type contactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type profileType = {
    photos: photosType
    aboutMe: string
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
}

export type oneUserType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}


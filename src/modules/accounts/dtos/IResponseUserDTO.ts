interface IResponseUserDTO {
    avatar: string;
    driver_license: string;
    email: string;
    id: string;
    name: string;
    avatar_url(): string;
}

export { IResponseUserDTO}
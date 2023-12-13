export interface LoginUserDto {
    email: string;
    password: string;
};

export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
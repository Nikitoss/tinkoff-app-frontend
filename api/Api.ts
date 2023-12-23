/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
    CardRequest,
    CardResponse,
    ProjectRequest,
    ProjectResponse,
    VoteRequest,
    RegisterRequest,
    LoginRequest,
    Token,
    SettingsResponse,
    SettingsRequest,
    MemberResponse,
    MeResponse
} from "./dataСontracts";

const baseUrl: string = process.env.SERVER_URL || "https://213.171.9.177";

type Method = "GET" | "POST" | "PUT" | "DELETE"

const request = async <Response>({ path, method, body, useToken = true }: { path: string; method?: Method; body?: unknown; useToken?: boolean }) => {
    const result = {
        data: null as unknown as Response,
        error: null as unknown
    }

    const headers: RequestInit["headers"] = {
        "Content-Type": "application/json",
    };

    if (useToken) {
        const token = localStorage.getItem('token')?.toString();
        if (token !== undefined) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(`${baseUrl}${path}`, {
            method,
            body: body !== null ? JSON.stringify(body) : body,
            // credentials: "include", // Можно использовать, если клиент и сервер будут на одном домене
            headers
        });
        const data = await response.json();
        if (response.ok) {
            result.data = data;
        } else {
            result.error = data;
        }
        return result;

    } catch (error) {
        result.error = error;
        return result;
    }
}

/**
 * No description
 *
 * @tags Projects
 * @name GetProjectById
 * @summary Get project by id
 * @request GET:/api/v1/projects/{projectId}
 */
export const getProjectById = (projectId: number) =>
    request<ProjectResponse>({
        path: `/api/v1/projects/${projectId}`,
        method: "GET"
    });

/**
 * No description
 *
 * @tags Projects
 * @name UpdateProject
 * @summary Update project
 * @request PUT:/api/v1/projects/{projectId}
 */
export const updateProject = (projectId: number, data: ProjectRequest) =>
    request<ProjectResponse>({
        path: `/api/v1/projects/${projectId}`,
        method: "PUT",
        body: data
    });

/**
 * No description
 *
 * @tags Projects
 * @name DeleteProject
 * @summary Delete project
 * @request DELETE:/api/v1/projects/{projectId}
 */
export const deleteProject = (projectId: number) =>
    request<boolean>({
        path: `/api/v1/projects/${projectId}`,
        method: "DELETE"
    });

/**
 * No description
 *
 * @tags Projects
 * @name GetAllProjects
 * @summary Get all projects
 * @request GET:/api/v1/projects/
 */
export const getAllProjects = () =>
    request<ProjectResponse[]>({
        path: `/api/v1/projects/`,
        method: "GET"
    });

/**
 * No description
 *
 * @tags Projects
 * @name CreateProject
 * @summary Create project
 * @request POST:/api/v1/projects/
 */
export const createProject = (data: ProjectRequest) =>
    request<ProjectResponse>({
        path: `/api/v1/projects/`,
        method: "POST",
        body: data
    });

/**
 * No description
 *
 * @tags Projects
 * @name CreateInviteLink
 * @summary Create invite link
 * @request POST:/api/v1/projects/{projectId}/link
 */
export const createInviteLink = (projectId: number) =>
    request<string>({
        path: `/api/v1/projects/${projectId}/link`,
        method: "POST",
    });

/**
 * No description
 *
 * @tags Projects
 * @name EnterFromInviteLink
 * @summary Enter to project from invite link
 * @request POST:/api/v1/projects/{inviteLink}
 */
export const enterFromInviteLink = (inviteLink: string) =>
    request<boolean>({
        path: `/api/v1/projects/${inviteLink}`,
        method: "POST",
    });

/**
 * No description
 *
 * @tags project-settings-controller
 * @name GetProjectSettings
 * @summary Get project settings
 * @request POST:/api/v1/projects/{projectId}/settings
 */
export const getProjectSettings = (projectId: number) =>
request<SettingsResponse>({
    path: `/api/v1/projects/${projectId}/settings`,
    method: "GET",
})

/**
* No description
*
* @tags project-settings-controller
* @name UpdateProjectSettings
* @summary Update project settings
* @request POST:/api/v1/projects/{projectId}/settings
*/
export const updateProjectSettings = (projectId: number, data: SettingsRequest) =>
request<SettingsResponse>({
    path: `/api/v1/projects/${projectId}/settings`,
    method: "PUT",
    body: data
})

/**
 * No description
 *
 * @tags Cards
 * @name GetCardById
 * @summary Get card by id
 * @request GET:/api/v1/projects/{projectId}/cards/{cardId}
 */
export const getCardById = (projectId: number, cardId: number) =>
    request<CardResponse>({
        path: `/api/v1/projects/${projectId}/cards/${cardId}`,
        method: "GET"
    });

/**
 * No description
 *
 * @tags Cards
 * @name UpdateCard
 * @summary Update card
 * @request PUT:/api/v1/projects/{projectId}/cards/{cardId}
 */

export const updateCard = (projectId: number, cardId: number, data: CardRequest) =>
    request<CardResponse>({
        path: `/api/v1/projects/${projectId}/cards/${cardId}`,
        method: "PUT",
        body: data
    });

/**
 * No description
 *
 * @tags Cards
 * @name DeleteCard
 * @summary Delete card
 * @request DELETE:/api/v1/projects/{projectId}/cards/{cardId}
 */
export const deleteCard = (projectId: number, cardId: number) =>
    request<boolean>({
        path: `/api/v1/projects/${projectId}/cards/${cardId}`,
        method: "DELETE"
    });

/**
 * No description
 *
 * @tags Cards
 * @name GetAllCards
 * @summary Get all cards
 * @request GET:/api/v1/projects/{projectId}/cards/
 */
export const getAllCards = (projectId: number) =>
    request<CardResponse[]>({
        path: `/api/v1/projects/${projectId}/cards/`,
        method: "GET"
    });

/**
 * No description
 *
 * @tags Cards
 * @name CreateCard
 * @summary Create card
 * @request POST:/api/v1/projects/{projectId}/cards/
 */
export const createCard = (projectId: number, data: CardRequest) =>
    request<CardResponse>({
        path: `/api/v1/projects/${projectId}/cards/`,
        method: "POST",
        body: data
    });

/**
 * No description
 *
 * @tags Cards
 * @name VoteForCards
 * @summary Vote for cards
 * @request POST:/api/v1/projects/{projectId}/cards/{cardId}/vote
 */
export const voteForCards = (projectId: number, cardId: number, data: VoteRequest) =>
    request<boolean>({
        path: `/api/v1/projects/${projectId}/cards/${cardId}/vote?voteType=${data.voteType}`,
        method: "POST",
    });

/**
 * No description
 *
 * @tags Authentification
 * @name RegisterUser
 * @summary Register user
 * @request POST:/api/v1/auth/register/
 */
export const registerUser = (data: RegisterRequest) =>
    request<200>({
        path: `/api/v1/auth/register/`,
        method: "POST",
        body: data
    });

/**
 * No description
 *
 * @tags Authentification
 * @name LoginUser
 * @summary Login user
 * @request POST:/api/v1/auth/login/
 */
export const loginUser = (data: LoginRequest) =>
    request<Token>({
        path: `/api/v1/auth/login`,
        method: "POST",
        body: data,
        useToken: false
    }).then(x => {
        if (x.data?.token && x.error === null) {
            localStorage.setItem('token', x.data.token)
        }
        return x
    });

/**
 * No description
 *
 * @tags project-member-controller
 * @name GetMembers
 * @summary Get members
 * @request GET:/api/v1/projects/{projectId}/members
 */
export const getMembers = (projectId: number) =>
    request<MemberResponse[]>({
        path: `/api/v1/projects/${projectId}/members`,
        method: "GET",
    });
    
/**
 * No description
 *
 * @tags project-member-controller
 * @name DeleteMember
 * @summary Delete member by id
 * @request GET:/api/v1/projects/{projectId}/members/{memberId}
 */
export const deleteMember = (projectId: number, memberId: number) =>
    request<boolean>({
        path: `/api/v1/projects/${projectId}/members/${memberId}`,
        method: "DELETE",
    });

/**
 * No description
 *
 * @tags project-user-controller
 * @name GetMe
 * @summary Get me
 * @request GET:/api/v1/projects/{projectId}/me
 */
export const getMe = (projectId: number) =>
    request<MeResponse>({
        path: `/api/v1/projects/${projectId}/me`,
        method: "GET",
    });
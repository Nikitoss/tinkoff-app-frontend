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

import { CardRequest, CardResponse, ProjectRequest, ProjectResponse } from "./data-contracts";

const baseUrl: string = "http://213.171.9.177:8000";

type Method = "GET" | "POST" | "PUT" | "DELETE"

const request = async <Response>({ path, method, body }: { path: string; method?: Method; body?: unknown; }) => {
    const result = {
        data: null as unknown as Response,
        error: null as unknown
    }

    try {
        const response = await fetch(`${baseUrl}${path}`, {
            method,
            body: body !== null ? JSON.stringify(body) : body,
            headers: {
                "Content-Type": "application/json",
            },
            mode: 'no-cors'
        });

        try {
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

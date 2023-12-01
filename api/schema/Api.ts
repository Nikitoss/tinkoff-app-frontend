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

export interface ProjectRequest {
  title?: string;
}

export interface ProjectResponse {
  /** @format int64 */
  id?: number;
  title?: string;
  /** @format int64 */
  authorId?: number;
  /** @format date-time */
  createAt?: string;
}

export interface CardRequest {
  title?: string;
  summary?: string;
  status?: "NEW" | "IN_WORK" | "ACCEPTED" | "DISMISS";
}

export interface CardResponse {
  /** @format int64 */
  id?: number;
  title?: string;
  summary?: string;
  /** @format date-time */
  createAt?: string;
  /** @format int64 */
  authorId?: number;
  /** @format int32 */
  upVote?: number;
  /** @format int32 */
  downVote?: number;
  status?: "NEW" | "IN_WORK" | "ACCEPTED" | "DISMISS";
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://213.171.9.177:8000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://213.171.9.177:8000
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Projects
     * @name GetProjectById
     * @summary Get project by id
     * @request GET:/api/v1/projects/{projectId}
     */
    getProjectById: (projectId: number, params: RequestParams = {}) =>
      this.request<ProjectResponse, any>({
        path: `/api/v1/projects/${projectId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name UpdateProject
     * @summary Update project
     * @request PUT:/api/v1/projects/{projectId}
     */
    updateProject: (projectId: number, data: ProjectRequest, params: RequestParams = {}) =>
      this.request<ProjectResponse, any>({
        path: `/api/v1/projects/${projectId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name DeleteProject
     * @summary Delete project
     * @request DELETE:/api/v1/projects/{projectId}
     */
    deleteProject: (projectId: number, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/api/v1/projects/${projectId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cards
     * @name GetCardById
     * @summary Get card by id
     * @request GET:/api/v1/projects/{projectId}/cards/{cardId}
     */
    getCardById: (projectId: number, cardId: number, params: RequestParams = {}) =>
      this.request<CardResponse, any>({
        path: `/api/v1/projects/${projectId}/cards/${cardId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cards
     * @name UpdateCard
     * @summary Update card
     * @request PUT:/api/v1/projects/{projectId}/cards/{cardId}
     */
    updateCard: (projectId: number, cardId: number, data: CardRequest, params: RequestParams = {}) =>
      this.request<CardResponse, any>({
        path: `/api/v1/projects/${projectId}/cards/${cardId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cards
     * @name DeleteCard
     * @summary Delete card
     * @request DELETE:/api/v1/projects/{projectId}/cards/{cardId}
     */
    deleteCard: (projectId: number, cardId: number, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/api/v1/projects/${projectId}/cards/${cardId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cards
     * @name GetAllCards
     * @summary Get all cards
     * @request GET:/api/v1/projects/{projectId}/cards/
     */
    getAllCards: (projectId: number, params: RequestParams = {}) =>
      this.request<CardResponse[], any>({
        path: `/api/v1/projects/${projectId}/cards/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cards
     * @name CreateCard
     * @summary Create card
     * @request POST:/api/v1/projects/{projectId}/cards/
     */
    createCard: (projectId: number, data: CardRequest, params: RequestParams = {}) =>
      this.request<CardResponse, any>({
        path: `/api/v1/projects/${projectId}/cards/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name GetAllProjects
     * @summary Get all projects
     * @request GET:/api/v1/projects/
     */
    getAllProjects: (params: RequestParams = {}) =>
      this.request<ProjectResponse[], any>({
        path: `/api/v1/projects/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name CreateProject
     * @summary Create project
     * @request POST:/api/v1/projects/
     */
    createProject: (data: ProjectRequest, params: RequestParams = {}) =>
      this.request<ProjectResponse, any>({
        path: `/api/v1/projects/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}

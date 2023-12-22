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
  /** @format int64 */
  projectId?: number;
  title?: string;
  summary?: string;
  /** @format date-time */
  createAt?: string;
  /** @format int64 */
  authorId?: number;
  authorName?: string;
  /** @format int32 */
  upVote?: number;
  /** @format int32 */
  downVote?: number;
  status?: "NEW" | "IN_WORK" | "ACCEPTED" | "DISMISS";
}

export enum Vote {
  For = "VOTE_FOR",
  Against = "VOTE_AGAINST"
}

export interface VoteRequest {
  voteType?: Vote;
}

export interface RegisterRequest {
  login?: string;
  password?: string;
}

export interface Token {
  token: string;
}

export interface LoginRequest {
  login?: string;
  password?: string;
  token?: string
}
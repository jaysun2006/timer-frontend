import { BACKEND_BASE_URL } from "../config/connect";

/***
 * API Connection URLs
 * */
export const API_URL = BACKEND_BASE_URL;
export const LOGIN_URL = "rest-auth/login/";
export const SIGNUP_URL = "rest-auth/registration/";
export const USER_DATA_API = "rest-auth/user/";
export const ENTRY_LIST_API = "timer/all_entry/";
export const ENTRY_CREATE_API = "timer/";
export const ENTRY_COMPLETE_API = "timer/%s/complete/";
export const ACTIVE_ENTRY_LIST_API = "timer/active/";

import {token} from "@/utils/auth.js";

const jsonContentType = {
    'Content-Type': 'application/json',
};

const authorization = {
    'Authorization': `Bearer ${token}`
};

const defaultHeaders = { ...jsonContentType, ...authorization };

export { jsonContentType, authorization, defaultHeaders };
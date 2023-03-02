export interface paths{
    "/staff-test/staffs": {
        /** return rows of staff */
        get: {
            parameters: {
                query: {
                    /** offset number */
                    offset?: number;
                    /** limit number */
                    limit?: number;
                    /** search string */
                    search?: string;
                };
            };
            responses: {
                /** OK */
                200: {
                    schema: definitions["fiber_server.staffListResponse"];
                };
                /** Bad Request */
                400: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
                /** Forbidden */
                403: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
                /** Internal Server Error */
                500: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
            };
        };

        post: {
            parameters: {
                body: {
                    /** The input staff struct */
                    data: definitions["fiber_server.Staff"];
                };
            };
            responses: {
                /** IDs of created staff */
                201: {
                    schema: string;
                };
                /** Bad Request */
                400: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
                /** Forbidden */
                403: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
                /** Internal Server Error */
                500: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
            };
        };
    };
    "/staff-test/staffs/{staff_id}":{
        get:{
            parameters:{
                path:{
                    /** The id of staff */
                    staff_id:string;
                };
            };
            responses:{
                /** The id of staff */
                200: {
                    schema: definitions["fiber_server.Staff"];
                };
                /** Bad Request */
                400: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
                /** Forbidden */
                403: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
                /** Internal Server Error */
                500: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
            }
        }
        put: {
            parameters: {
                path: {
                    /** The id of staff */
                    staff_id:string;
                };
                body: {
                    /** The input customer struct */
                    data: definitions["fiber_server.Staff"];
                };
            };
            responses: {
                /** OK */
                200: {
                    schema: string;
                };
                /** Bad Request */
                400: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
                /** Forbidden */
                403: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
                /** Internal Server Error */
                500: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
            };
        };
        /** return OK */
        delete: {
            parameters: {
                path: {
                    /** The id of staff */
                    staff_id:string;
                };
            };
            responses: {
                /** OK */
                200: {
                    schema: string;
                };
                /** Bad Request */
                400: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
                /** Forbidden */
                403: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
                /** Internal Server Error */
                500: {
                    schema: definitions["fiber_server.ErrorResponse"];
                };
            };
        };
    }
}

export interface definitions {
    "fiber_server.Staff":{
        id?:string;
        first_name:string;
        last_name:string;
        email:string;
    };
    "fiber_server.staffListResponse":{
        data?:definitions["fiber_server.Staff"][];
        total?:number;
    };
    "fiber_server.ErrorResponse": {
        error?: string;
        error_code?: number;
        issue_id?: string;
    };
}
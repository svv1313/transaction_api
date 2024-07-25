declare module '@svv1313/be-services-lib' {
  type send = (data: any) => void;
  type status = (code: number) => { send };

  export interface Request extends Express.Request {
    user: {
      id: number;
    };
  }

  export interface Response extends Express.Response {
    req: Request;
    send;
    status;
  }
}

export interface ITransport {
    call(url: string, params: any): any;
  }
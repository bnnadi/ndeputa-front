import { environment } from './environments/environment';
export class Constants {
  // tslint:disable-next-line:max-line-length
  public static get API_URL(): string { return  (environment.production) ? 'http://www.denadis.com/api/v1/' : 'http://127.0.0.1:3000/api/v1/'; }
}

declare module 'js-cookie' {
  interface CookieAttributes {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }

  interface CookiesStatic {
    set(name: string, value: any, options?: CookieAttributes): void;
    get(name: string): string | undefined;
    remove(name: string, options?: CookieAttributes): void;
    getJSON(name: string): any;
  }

  const Cookies: CookiesStatic;
  export default Cookies;
} 
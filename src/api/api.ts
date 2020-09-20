export interface IResponse<T> {
  data: T | null;
  error: string | null;
}

export interface IApi {
  get: <T>(
    url: string,
    query?: string | Record<string, string>
  ) => Promise<IResponse<T>>;
}

class Api implements IApi {
  constructor(private baseUrl: string) {}

  public get = async <T>(
    url: string,
    query?: string | Record<string, string>
  ): Promise<IResponse<T>> => {
    let urlWithQueryParams = `${this.baseUrl}${url}`;
    if (query) {
      if (typeof query === "string") urlWithQueryParams += `?${query}`;
      if (typeof query === "object")
        urlWithQueryParams += `?${Object.entries(query)
          .map((keyValuePair) => keyValuePair.join("="))
          .join("&")}`;
    }

    const response: IResponse<T> = await fetch(urlWithQueryParams, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((r) => ({
        data: (r as unknown) as T,
        error: null,
      }))
      .catch((error) => {
        return { data: null, error: JSON.stringify(error) };
      });

    return response;
  };
}

export default Api;

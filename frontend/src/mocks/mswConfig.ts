import { rest, setupWorker, SetupWorkerApi } from 'msw';
import { parse } from 'query-string';

type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface MockData {
  name: string;
  url: string;
  method: string;
  response: {
    [key: string]: {
      status: number;
      data: any;
      [key: string]: any;
    };
  };
}

export interface MswHandlerParam {
  mockJson: MockData;
  key?: string | ((count: number) => string);
  useSearchKey?: boolean; // url의 search (query param) 값을 key로 사용
  defaultKey?: string; // useSearchKey를 사용 할 때 매칭되지 않을 경우 기본 key 값
  delay?: number;
  isNetworkError?: boolean;
}

interface GenerateMswHandlerParam {
  data: MswHandlerParam[];
  callback?: (
    mock: { name: string },
    request: { url: string; search: any; params: any; body: any },
    response: { status: number; data: any }
  ) => void;
}

const countMap: Record<string, number> = {};

function generateMswHandler({ data, callback }: GenerateMswHandlerParam) {
  return data.map(
    ({ mockJson: { name, url, method, response }, key, delay, useSearchKey, defaultKey, isNetworkError }) => {
      const path = url.replace('#{apiDomain}', process.env.REACT_APP_API_DOMAIN || '');
      return rest[method as RequestMethod](path, async (req, res, ctx) => {
        const countKey = `${window.location.search}|${path}`;
        const count = countMap[countKey] ?? 0;
        let resKey: string = useSearchKey ? req.url.search : typeof key === 'string' ? key : key!(count);
        countMap[countKey] = count + 1;

        if (useSearchKey && response[resKey] === undefined && defaultKey) {
          resKey = defaultKey;
        }

        callback?.(
          {
            name,
          },
          {
            url: `${req.method}/${path}`,
            search: req.url.search ? parse(req.url.search) : null,
            params: req.params,
            body: req.body || null,
          },
          {
            data: response[resKey]?.data,
            status: response[resKey]?.status,
          }
        );

        if (isNetworkError) {
          return res.networkError('Failed to connect');
        }

        return res(ctx.status(response[resKey].status), ctx.json(response[resKey].data), ctx.delay(delay));
      });
    }
  );
}

/**
 * MSW ServiceWorker 실행 (브라우저 환경 전용)
 */
let worker: SetupWorkerApi;
export function setupMockWorker(handlerParams: GenerateMswHandlerParam) {
  const handlers = generateMswHandler(handlerParams);

  if (worker) {
    worker.resetHandlers(...handlers);
  } else {
    worker = setupWorker(...handlers);

    // REF: https://mswjs.io/docs/api/setup-worker/start
    worker.start({
      serviceWorker: {
        url: 'mockServiceWorker.js',
      },
      onUnhandledRequest: 'bypass',
    });
  }

  return worker;
}

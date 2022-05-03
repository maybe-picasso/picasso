import { stringify } from 'query-string';

export interface GeneratePathProps {
  url: string;
  pathParams?: Record<string, any>;
  queryParams?: Record<string, any>;
}

export const generatePath = ({ url, pathParams, queryParams }: GeneratePathProps) => {
  let resultPath = url;
  if (pathParams && Object.keys(pathParams).length > 0) {
    resultPath = Object.keys(pathParams).reduce((acc: string, pathName: string) => {
      return acc.replace(`:${pathName}`, `${pathParams[pathName]}`);
    }, resultPath);
  }
  if (queryParams) {
    resultPath = `${resultPath}?${stringify(queryParams, { encode: false })}`;
  }
  return resultPath;
};

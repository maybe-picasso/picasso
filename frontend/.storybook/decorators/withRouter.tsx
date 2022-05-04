import { ReactNode, useContext, useLayoutEffect } from 'react';
import { MemoryRouter, Route, Routes, UNSAFE_NavigationContext } from 'react-router';
import { action } from '@storybook/addon-actions';
import { stringify, parse } from 'query-string';
import { generatePath, GeneratePathProps } from '../../src/helpers/url';

const RouterInner = ({ storybookComponent, url }: { storybookComponent: ReactNode; url: string }) => {
  const { navigator } = useContext(UNSAFE_NavigationContext);

  useLayoutEffect(() => {
    Object.keys(navigator).forEach((name) => {
      Object.defineProperty(navigator, name, {
        value: (to: any) => {
          action(`router/${name}`)(to.pathname ? `${to.pathname}${to.search}` : to);
        },
      });
    });
  }, [navigator]);

  return (
    <Routes>
      <Route path={url} element={storybookComponent} />
    </Routes>
  );
};

export const withRouter = ({ url, pathParams, queryParams }: GeneratePathProps) => {
  return (storybookComponent: () => ReactNode) => {
    useLayoutEffect(() => {
      if (queryParams) {
        const { id, viewMode } = parse(window.location.search);
        const newLocation = new URL(window.location.href);
        const newSearch = stringify({ id, viewMode, ...queryParams });
        newLocation.search = newSearch;
        window.history.replaceState({}, window.document.title, newLocation.toString());
      }
    });

    return (
      <MemoryRouter
        initialEntries={[
          generatePath({
            url,
            pathParams,
            queryParams,
          }),
        ]}
      >
        <RouterInner storybookComponent={storybookComponent()} url={url} />
      </MemoryRouter>
    );
  };
};

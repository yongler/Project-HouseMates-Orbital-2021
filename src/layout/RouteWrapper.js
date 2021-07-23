import React from "react";
import { Route } from "react-router-dom";

const RouteWrapper = ({
  title,
  component: Component,
  layout: Layout,
  setTheme,
  theme,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props} title={title} setTheme={setTheme} theme={theme}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default RouteWrapper;

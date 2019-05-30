import { NavigationRoute, NavigationScreenProp } from "react-navigation";

export const getNavigationParams = <Params = { [key: string]: any }>(
  params: Params,
  navigation: NavigationScreenProp<NavigationRoute<Params>>
) => {
  const parameters: Array<Params[keyof Params]> = [];
  Object.entries(params).forEach(([paramKey, paramValue]) => {
    parameters.push(navigation.getParam(paramKey, paramValue));
  });
  return parameters;
};

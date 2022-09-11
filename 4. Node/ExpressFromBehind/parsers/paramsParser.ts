export function paramsParser(url: string, route: string): false | {} {
  const urlParts = url.split("/");
  const routeParts = route.split("/");
  let params = {};

  if (urlParts.length === routeParts.length) {
    for (let index = 0; index < routeParts.length; index++) {
      if (routeParts[index][0] === ":") {
        params[routeParts[index].replace(":", "")] = urlParts[index];
      } else if (routeParts[index] !== urlParts[index]) return false;
    }
    return params;
  }
  return false;
}

const Request = require("request-promise");
import { environment } from "../environments/environment";

export const stocksPlugin = {
  name: "stocksPlugin",
  version: "1.0.0",
  register: async function(server, options) {
    server.route({
      method: "GET",
      path: "/stocks/{symbol}/{period}",
      options: {
        cors: true
      },
      handler: async function(request, h) {
        const { symbol, period } = request.params;
        return await server.methods.stocksApi(symbol, period);
      }
    });
  }
};

export const stocksApi = async (symbol, period) => {
  return await Request.get(
    `${environment.apiURL}/beta/stock/${symbol}/chart/${period}?token=${
      environment.apiKey
    }`
  );
};

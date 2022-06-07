import axios from "axios";
import { getAuthHeader, REFRESH_TOKEN_URL } from "../../resources/api";
import { withLogs } from "../../resources/logging";

export async function handleRefreshToken() {
    const authHeaders = getAuthHeader();

    try{
        const response = await withLogs(axios.get(
                REFRESH_TOKEN_URL,
                {headers: authHeaders}),
                "REFRESH_TOKEN"
            );
        
        const {jwtToken} = response;
        localStorage.setItem('token', jwtToken);
        return true;
        
        } catch (error){
            if (error.response.status === 401){     // session expired => login again
                throw error;
            }
        }
}

export function authRequestWrapper(request){
    return async (...args) => {
      try {
        return await request(...args); // try the request and return the results !!!
      }
      catch(err) {
        if (err.response.status === 401){     // refresh token and try again
            try{
                debugger;
                const response = await withLogs(axios.get(  // refresh token
                        REFRESH_TOKEN_URL,
                        {headers: getAuthHeader()}),
                        "REFRESH_TOKEN"
                    );
                debugger;
                const {jwtToken} = response;
                localStorage.setItem('token', jwtToken);

                return await request(...args);   // try again
                
                } catch (error){
                    if (error.response.status === 401){     // session expired => login again
                        throw error;
                    }
                }
        }
      }
    }
  }
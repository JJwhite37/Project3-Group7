export const refreshToken = (userInfo) => {
  // Timing to renew access token
  let refreshTiming = (userInfo.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthInfo = await userInfo.reloadAuthResponse();
    refreshTiming = (newAuthInfo.expires_in || 3600 - 5 * 60) * 1000;
    console.log('refreshed token ', newAuthInfo);
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    localStorage.setItem('authToken', newAuthInfo.id_token);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};
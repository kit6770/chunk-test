/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
async function initPage() {
  const url = new URL(location.href);
  if (url.searchParams.get("state") === "task_x_bind") {
    localStorage.setItem("task_x_bind", JSON.stringify({
      code: url.searchParams.get("code")
    }));
    window.close();
    return;
  }
  if (url.searchParams.get("state") === "task_discord_bind") {
    localStorage.setItem("task_discord_bind", JSON.stringify({
      code: url.searchParams.get("code")
    }));
    window.close();
    return;
  }
  const reqPrefix = url.origin === "https://chat.sending.me" ? "https://hs.sending.me" : "https://hs-alpha.sending.me";
  const reqUrl = `${reqPrefix}/_api/client/r0/twitter/oauth2/login?code=${url.searchParams.get("code")}`;
  try {
    const res = await fetch(reqUrl, {
      method: "POST"
    });
    if (res.status === 200) {
      const {
        twitter_access_token,
        twitter_user_base_info,
        twitter_user_base_info: {
          name,
          username,
          twitter_id,
          profile_image_url
        }
      } = await res.json();
      localStorage.setItem("third_auth", JSON.stringify({
        authType: url.searchParams.get("state"),
        twitter_access_token,
        twitter_user_base_info,
        name,
        username,
        twitter_id,
        profile_image_url
      }));
      window.close();
    } else {
      var _content$error, _content$error2, _content$error3, _content$error4, _content$error5, _content$error6;
      const content = await res.json();
      document.getElementById("error-title").innerHTML = content === null || content === void 0 ? void 0 : (_content$error = content.error) === null || _content$error === void 0 ? void 0 : _content$error.error;
      document.getElementById("error-desc").innerHTML = content === null || content === void 0 ? void 0 : (_content$error2 = content.error) === null || _content$error2 === void 0 ? void 0 : _content$error2.error_description;
      document.getElementById("error-detail").innerHTML = content === null || content === void 0 ? void 0 : (_content$error3 = content.error) === null || _content$error3 === void 0 ? void 0 : _content$error3.error_detail;
      document.getElementById("error-title").style.display = !!(content !== null && content !== void 0 && (_content$error4 = content.error) !== null && _content$error4 !== void 0 && _content$error4.error) ? "block" : "none";
      document.getElementById("error-desc").style.display = !!(content !== null && content !== void 0 && (_content$error5 = content.error) !== null && _content$error5 !== void 0 && _content$error5.error_description) ? "block" : "none";
      document.getElementById("error-detail").style.display = !!(content !== null && content !== void 0 && (_content$error6 = content.error) !== null && _content$error6 !== void 0 && _content$error6.error_detail) ? "block" : "none";
    }
  } catch (err) {
    document.getElementById("error-title").innerHTML = JSON.stringify(err);
    document.getElementById("error-title").style.display = "block";
  }
  document.getElementById("loading").style.display = "none";
}
initPage();
/******/ })()
;
//# sourceMappingURL=third_auth.js.map
import { getCookie } from "cookies-next";

const getCookieClient = () => {
  const token = getCookie("session");

  return token;
};

export default getCookieClient;

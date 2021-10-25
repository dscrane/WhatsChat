import axios from "axios";
export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://dsc-whatschat.herokuapp.com/"
      : "http://localhost:5500",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:5500/*",
    "Content-Security-Policy": "default-src *",
  },
});

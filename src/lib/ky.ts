import ky from "ky";

const kyInstance = ky.create({
  prefixUrl: "https://www.jsonplaceholder.typicode.com",
  timeout: 5000,
});
export default kyInstance;

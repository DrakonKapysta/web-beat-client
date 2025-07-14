import axios from "axios";

class AuthHelper {
  public axios;
  constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:3000/api",
      timeout: 3000,
    });
  }
}

export default new AuthHelper();

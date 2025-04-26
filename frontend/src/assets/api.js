import axios from "axios";

const Base_Url = "http://localhost:3000";

export async function fetchUrl(urlData) {
  const res = await axios.post(`${Base_Url}/url`, urlData);
  const data = res.data;
  return data;
}

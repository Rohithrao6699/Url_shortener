import { useEffect, useState } from "react";
import { fetchUrl } from "../src/assets/api";
function App() {
  const [url, setUrl] = useState({});
  const [shorturl, setShortUrl] = useState(null);

  function handleChange(e) {
    setUrl((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(url);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await fetchUrl(url);
    console.log(data.urls.shortUrl);
    setShortUrl(data.urls.shortUrl);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="url" onChange={(e) => handleChange(e)} />
        <button type="submit">Generate shortUrl</button>
      </form>
      {shorturl && <input value={`http://localhost:3000/${shorturl}`} />}
    </>
  );
}

export default App;

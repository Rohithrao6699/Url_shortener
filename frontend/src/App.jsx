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
    setUrl("");
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-[#031F39] to-[#F7F9FC]">
        <nav className="h-[10%] flex flex-row justify-between items-center px-10">
          <div className="text-3xl font-semibold tracking-wider text-center text-[#EEF4FF]">
            TRIMMED
          </div>
          <div className="flex flex-row gap-8">
            <div className="text-lg font-normal tracking-wide text-[#EFF8FF]">
              pricing
            </div>
            <div className="text-lg font-normal tracking-wide text-[#EFF8FF]">
              solutions
            </div>
          </div>
        </nav>
        <section className="h-[30%] flex flex-col justify-end items-center gap-1 py-4 text-center">
          <h2 className="text-center text-5xl font-bold tracking-wide text-[#FFFFFF]">
            Shorter URL'S
          </h2>
          <h4 className="text-center text-xl tracking-tight text-[#FFFFFF]">
            Get Short, Move Fast!
          </h4>
        </section>

        <div className="h-[65%] flex items-center justify-center">
          <div className="bg-gradient-to-b from-[#55697B] to-[#EDF1F4] rounded-md h-[78%] w-[50%] flex flex-col items-start justify-between py-3 px-10 shadow-md">
            <section className="flex flex-col">
              <p className="text-2xl font-medium text-[#1A1E4C]">
                Get Shorter Link
              </p>
              <p className="text-base font-light text-[#1A1E4C]">
                no credit card needed
              </p>
            </section>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <h4 className="text-xl font-medium tracking-normal text-[#1A1E4C]">
                Paste your long link here!
              </h4>
              <input
                className="w-full p-1 border-2 border-[#B2BDC6] bg-[#EEF1F5] rounded-md focus:outline-none"
                placeholder="Enter your long URL here"
                type="text"
                name="url"
                value={url}
                onChange={(e) => handleChange(e)}
              />
              <button
                className="outline-none bg-[#1E374E] text-[#EFF8FF] rounded-md text-lg font-medium text-center px-2 py-1 w-auto flex justify-start items-center cursor-pointer"
                type="submit"
              >
                Generate Short URL
              </button>
            </form>
            {shorturl && (
              <input
                className="outline-none text-lg tracking-normal"
                value={`http://localhost:3000/${shorturl}`}
              />
            )}
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" name="url" onChange={(e) => handleChange(e)} />
        <button type="submit">Generate shortUrl</button>
      </form>
      {shorturl && <input value={`http://localhost:3000/${shorturl}`} />} */}
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import LimitedText from "./LimitedText";

function Post() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const getData = async (text) => {
    const response = await axios.get(
      `http://localhost:4001/trips?keywords=${text}`
    );
    setData(response.data.data);
  };

  useEffect(() => {
    getData(search);
  }, [search]);

  return (
    <>
      <div className="w-screen flex flex-col justify-evenly items-center space-y-10 font-noto pt-10">
        <div className="text-[56px] font-bold text-sky-600 ">
          <p>เที่ยวไหนดี</p>
        </div>
      </div>
      <div className="w-screen flex flex-col items-center font-noto pt-10">
        <p className="w-3/5">ค้นหาที่เที่ยว</p>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className="w-3/5 text-center border-b-4 focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-screen flex flex-col justify-evenly items-center space-y-10 font-noto pt-10">
        {data.map((item) => {
          return (
            <div
              className="w-screen h-[300px] flex flex-row justify-start items-center ml-[800px]"
              key={item.eid}
            >
              <img
                src={item.photos[0]}
                className="w-[350px] h-[250px] object-cover rounded-3xl"
              />
              <div className="flex flex-col justify-between space-y-1 ml-[50px]">
                <p className="text-[30px]">{item.title}</p>
                <LimitedText text={item.description} />
                <a href={item.url} className="w-[50px]">
                  <p className="text-sky-400 underline">อ่านต่อ</p>
                </a>
                <div className="flex flex-row space-x-4">
                  <p>หมวด</p>
                  {item.tags.map((item, i) => (
                    <button key={i} className="text-gray-500 underline">
                      {item}
                    </button>
                  ))}
                </div>
                <div className="flex flex-row space-x-8">
                  {item.photos.slice(1).map((item, i) => (
                    <img
                      key={i}
                      src={item}
                      className="w-[100px] h-[100px] object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Post;

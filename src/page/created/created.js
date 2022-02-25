import React, { useEffect, useRef, useState } from "react";
import "./created.css";

import img from "./../../asset/img/img";
import twiiterIcon from './../../asset/img/twitter_icon.png'
import { firestore } from "./../../database";
import Typed from "typed.js";
import queryString from "query-string";

export default function Created({ setLoading }) {
  const parsed = queryString.parse(window.location.search);
  const el = useRef(null);
  const typed = useRef(null);
  const [data, setData] = useState({
    id: 0,
    created: 0,
    report: 0,
    content: "null",
    music: {
      title:
        "null",
      channelTitle: "null",
      thumbnails: {
        medium: {
          width: 320,
          url: "null",
          height: 180,
        },
        high: {
          height: 360,
          width: 480,
          url: "null",
        },
        default: {
          height: 90,
          url: "null",
          width: 120,
        },
      },
      description: "null",
      channelId: "null",
      publishTime: "null",
      liveBroadcastContent: "null",
      id: { videoId: "null", kind: "null" },
      publishedAt: "null",
    },
    name: "null",
  });

  useEffect(() => {
    setLoading(true);
    if (!parsed.id) {
      window.location.href = "/";
    }
    const dataRef = firestore.collection("motivation").doc(parsed.id);
    dataRef.get().then((data) => {
      if (!data.exists) {
        window.location.href = "/";
        return;
      }
      setLoading(false);
      setData(data.data());
      const options = {
        strings: [data.data().content],
        typeSpeed: 50,
        backSpeed: 50,
      };
      typed.current = new Typed(el.current, options);
    });

    console.log(window.location);

    return () => {
      typed.current.destroy();
    };
  }, []);

  return (
    <div className="body">
      <div className="index-container">
        <div className="index-header">
          <span style={{ fontSize: 25 }}>กำลังใจของคุณถูกส่งไปแล้ว :)</span>
        </div>
        <div className="index-information">
          <span ref={el} />
        </div>

        {
          data.music ? (
            <iframe className="created-frame" width="300" height="190" style={{ marginTop: 30 }} src={`https://www.youtube.com/embed/${data.music.id.videoId}?controls=0`} title={data.music.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
          ) : (
            <div className="index-imgRandom">
              <img src={img[parseInt(Math.random() * 13)]} />
            </div>
          )
        }
        <div className="index-create"
          style={{display:'flex' , alignItems:'center' , justifyContent:'center' , gap:5 , color:'rgb(65,105,225)'}}
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.origin}%3Fp%3Drandom%26id%3D${data.id}&text=กำลังใจของ ${data.name} 😍&via=กอดกัน`, '_blank')}>
          <img src={twiiterIcon} /> แชร์ไปยัง twitter
        </div>

        <div
          className="index-create"
          onClick={() => (window.location.href = "/")}
        >
          กลับหน้าหลัก
        </div>

        <div className="index-credit">
          Created by <span className="index-create"
            onClick={() => window.open('https://twitter.com/lilpark96', '_blank')}>Rest</span> 🐵<br />
          Created by <span className="index-create"
            onClick={() => window.open('https://www.instagram.com/algnott/', '_blank')}>algnott</span>🐶<br />
        </div>
      </div>
    </div>
  );
}

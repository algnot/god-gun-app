import React, {useEffect, useState, useRef} from 'react'
import Typed from "typed.js"
import img from "./../../asset/img/img";
import twiiterIcon from './../../asset/img/twitter_icon.png'
import queryString from "query-string"
import { firestore } from '../../database'
import './random.css'

export default function Random({setLoading}) {
    const parsed = queryString.parse(window.location.search); 
    const el = useRef(null);
    const typed = useRef(null);
    const el2 = useRef(null);
    const typed2 = useRef(null);

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
      setLoading(true)
      const dataRef = firestore.collection('motivation').doc(parsed.id);
      dataRef.get()
      .then(doc => {
        setData(doc.data())
        setLoading(false)
        const options = {
          strings: [doc.data().name],
          typeSpeed: 50,
          backSpeed: 50,
        };
        typed.current = new Typed(el.current, options);
        const options2 = {
          strings: [doc.data().content],
          typeSpeed: 50,
          backSpeed: 50,
          showCursor: false,
        };
        typed2.current = new Typed(el2.current, options2);
      })
      .catch(_ => {
        alert('บางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง :(')
      })
      return () => {
        typed.current.destroy();
        typed2.current.destroy();
      };
    }, [])

  return (
    <div className="body">
      <div className="index-container">
        <div className="random-header">
          กำลังใจจาก {' '}
          <span ref={el} />
        </div>
        <div className="index-information"
             style={{width:350 , margin:'15px auto'}}>
          <span ref={el2} />
        </div>
        <div className="index-imgRandom"
             style={{marginBottom:0}}>
          <img src={img[parseInt(Math.random() * 13)]} />
        </div>

        {
          data.music && (
            <div className="create-y-search"
                 style={{margin:'7px auto', background :'#ee66aa'
                       , padding:10, borderRadius:10, cursor:'pointer', width:'fit-content'}}
                 onClick={() => window.location.href = `https://www.youtube.com/watch?v=${data.music.id.videoId}`}>
                <div className="create-y-search-img"
                     style={{backgroundImage:`url(${data.music.thumbnails.medium.url})`}}></div>
                <div className="create-y-search-name"
                     style={{color:'#fff'}}>
                    {data.music.title.substring(0,15)} ..
                </div>
            </div>
          )
        }

        <div className="index-create"
          style={{display:'flex' , alignItems:'center' , justifyContent:'center' , gap:5 , color:'rgb(65,105,225)'}}
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.origin}/god-gun-app%3Fp%3Drandom%26id%3D${data.id}&text=ฉันได้รับกำลังใจจาก ${data.name} 😍 &via=กอดกัน`, '_blank')}>
          <img src={twiiterIcon} /> แชร์ไปยัง twitter
        </div>

        <div className="index-create"
             onClick={() => window.location.href = "/god-gun-app"}>กลับหน้าหลัก</div>

        <div className="index-credit">
         Created by <span className="index-create"
                           onClick={() => window.open('https://twitter.com/lilpark96', '_blank')}>Rest</span> 🐵<br/>
         Created by <span className="index-create"
                           onClick={() => window.open('https://www.instagram.com/algnott/', '_blank')}>algnott</span>🐶<br/>
        </div>   
      </div>
    </div>
  )
}

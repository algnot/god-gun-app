import { useEffect, useRef } from "react";

import img from './../../asset/img/img'
import "./index.css";
import Typed from "typed.js";

function Index() {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "ขอให้ Dek65 ทุกคนติดตามคณะที่หวังน่ะงับ 🫂",
        "เป็นกำลังใจให้นะ :) ",
        "สู้เขา เราทำได้ /^_^/ ",
        "ขอให้โลกใจดีกับเธอนะ <3 ",
        "เมื่อคิดจะเดินไปข้างหน้า โปรดอย่าหันมองกลับหลังอย่างเสียดาย 👊",
        "หลังพายุผ่านไป ฟ้าย่อมสดใสเสมอ 🌧",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
    typed.current = new Typed(el.current, options);
    return () => {
      typed.current.destroy();
    };
  }, []);

  return (
    <div className="body">
      <div className="index-container">
        <div className="index-header">
          กอดกัน
          <span>.com</span>
        </div>
        <div className="index-information">
          <span ref={el} />
        </div>
        <div className="index-imgRandom">
          <img src={img[parseInt(Math.random() * 13)]} />
        </div>
        <div className="index-btn">รับคำอวยพรของคุณ</div>
        <div className="index-create"
             onClick={() => window.location.href = "?p=create"}>สร้างคำอวยพร</div>

        <div className="index-credit">
         Created by <span className="index-create"
                           onClick={() => window.open('https://twitter.com/lilpark96', '_blank')}>Rest</span> 🐵<br/>
         Created by <span className="index-create"
                           onClick={() => window.open('https://www.instagram.com/algnott/', '_blank')}>algnott</span>🐶<br/>
         
              
        </div>   

      </div>
    </div>
  );
}

export default Index;

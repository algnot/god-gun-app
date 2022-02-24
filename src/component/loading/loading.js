import { useRef , useEffect } from 'react'
import './loading.css'

import loadingImg from './../../asset/img/loading.gif'
import Typed from "typed.js";

export default function Loading() {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "กำลังบรรจุกำลังใจ .. &nbsp;",
        "กำลังส่งกำลังใจ .. &nbsp;",
        "กำลังใจถึงสาขาต้นทางแล้ว .. &nbsp;",
        "กำลังแกะห่อกำลังใจ .. &nbsp;",
        "กำลังใจถึงสาขาปลายทางเเล้ว .. &nbsp;"
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop:true
    };
    typed.current = new Typed(el.current, options);
    return () => {
      typed.current.destroy();
    }
  }, []);

  return (
    <div className='loading-container'>
        <img src={loadingImg} />
        <div><span ref={el} /></div>
    </div>
  )
}

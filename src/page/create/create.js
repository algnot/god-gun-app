import { useEffect, useRef, useState } from "react";
import './create.css'

import {firestore} from './../../database'
import Typed from "typed.js";
import axios from 'axios';

export default function Create({setLoading}) {
  const el = useRef(null);
  const typed = useRef(null);

  const youtubeKey = 'AIzaSyDo1WghEn5ngT7iRz3iht9229COoUL7MvQ'
  const [q, setQ] = useState('')
  const [list, setList] = useState([])

  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState(false)

  useEffect(() => {
    const options = {
      strings: [
        "ขอกำลังใจหน่อย :(&nbsp;",
      ],
      typeSpeed: 50,
      backSpeed: 50,
    };
    typed.current = new Typed(el.current, options);
    return () => {
      typed.current.destroy();
    }
  }, []);

  const onSearch = (value) => {
    if(!value) {
      alert('กรุณาใส่ชื่อเพลงที่ต้องการค้นหา')
      return
    }
    axios(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${youtubeKey}&q=${value}`)
    .then((result) => {
        var data = result.data
        var temp = []
        data.items.map((snip,index) => {
            snip.snippet.id = snip.id
            temp = [...temp , snip.snippet]
        })
        setUrl(temp[0])
        setList(temp)
    })
  }

  const createContent = () => {
    if(!name) {
      alert('กรุณาระบุชื่อของไอต้าว :(')
      return
    }
    if(!content) {
      alert('กรุณาระบุกำลังใจของไอต้าว :(')
      return
    }
    setLoading(true)

    const id = parseInt(Math.random() * 1000000 + 1000000)
    const contentRef = firestore.collection('motivation').doc(id.toString())
    contentRef.set({
      id : id,
      created : new Date().valueOf(),
      name : name, 
      content : content,
      music : url,
      report : 0,
    })
    .then( _ => {
      window.location.href = `?p=created&id=${id}`
    })
    
  }

  return (
    <div className='create-container'>
        <div className='create-header'>
          <span ref={el} />
        </div>

        <div className='create-header-form' style={{margin : '0'}}>
          <span style={{cursor:'pointer' , textDecoration:'underline'}}
                onClick={() => window.location.href = "/god-gun-app?p=home"}>กลับหน้าหลัก</span> 
        </div>
        <div className='create-header-form'>ชื่อของไอต้าว* <span>({name.length}/20)</span> </div>
        <input name="name"
               type="text"
               placeholder="ชื่อ .."
               value={name}
               onChange={(e) => setName(e.target.value.length < 21 ? e.target.value : name)}/>

        <div className='create-header-form'>กำลังใจของไอต้าว* <span>({content.length}/100)</span> </div>
        <textarea name="content"
                  placeholder="กำลังใจ .."
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value.length < 101 ? e.target.value : content)}/>
        
        <div className='create-header-form'>
            เพลงปลอบใจของไอต้าว
            {
                url && (
                    <span> <u style={{cursor:'pointer' , textDecoration:'underline'}}
                              onClick={() => {setUrl(false); setList([]);}}>ลบเพลง</u></span>
                )
            }
        </div>
        {
            !url && (
                <>
                <input name="name"
                       xtype="text"
                       placeholder="ค้นหา .."
                       value={q}
                       onChange={(e) => setQ(e.target.value)}/>
                <div className="index-btn"
                     style={{marginTop:20}}
                     onClick={() => onSearch(q)}>ค้นหาเพลง</div>
                </>
            )
        }
        {
            list.map((data,index) => {
                if(index == 0)
                return(
                    <div className="create-y-search" key={index}>
                        <div className="create-y-search-img"
                             style={{backgroundImage:`url(${data.thumbnails.medium.url})`}}></div>
                        <div className="create-y-search-name">
                            {data.title.substring(0,15)} ..
                        </div>
                    </div>
                )
            })
        }
        <div className="index-btn" style={{marginTop:20}}
             onClick={createContent}>สร้างกำลังใจ :)</div>
        <div className="index-credit">
        Created by <span className="index-create"
                           onClick={() => window.open('https://twitter.com/lilpark96', '_blank')}>Rest</span> 🐵<br/>
          Created by <span className="index-create"
                           onClick={() => window.open('https://www.instagram.com/algnott/', '_blank')}>algnott</span> 🐶


        </div>   
    </div>
  )
}

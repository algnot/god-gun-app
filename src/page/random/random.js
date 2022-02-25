import React, {useEffect, useState} from 'react'

import queryString from "query-string"
import { firestore } from '../../database'

export default function Random({setLoading}) {
    const parsed = queryString.parse(window.location.search); 

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
      })
      .catch(_ => {
        alert('บางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง :(')
      })
    }, [])

  return (
    <div>
        <h1>!!!This section is not done!!!</h1>
        <h2>Sample JSON Data</h2>
        {JSON.stringify(data)}
    </div>
  )
}

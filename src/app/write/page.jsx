"use client";

import React, { useEffect, useState } from 'react'
import styles from './write.module.css'
import Image from 'next/image'
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/utils/firebase';
import dynamic from 'next/dynamic';


const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});


function WritePage() {
  const {status} = useSession()
  // console.log(data);
  const router = useRouter()
  
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("travel");
  
  useEffect(()=>{
    if(file){
      const storage = getStorage(app);
      const upload = () => {
        const name = new Date().getTime + file.name;
        const storageRef = ref(storage, name);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
            console.error('Upload failed', error);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMedia(downloadURL)
            });
          }
        );
      }

      upload();
    }
  }, [file])

  if(status === "loading"){
      return (
          <div className={styles.loading}>
              Loading...
          </div>
      )
  }

  if(status === "unauthenticated"){
      router.push("/");
      return null;
  }


  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");


  const handleSubmit = async () => {
    const res = await fetch("https://dailydev-blog-saa21.netlify.app/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "travel",
      }),
    });
    
    if(res.status === 200){
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }

  }


  return (
    <div className={styles.container}>
      <input type="text" placeholder='Title' className={styles.input} onChange={(e)=>setTitle(e.target.value)}/>
      <select className={styles.select} onChange={(e)=>setCatSlug(e.target.value)}>
        <option value="style">Style</option>
        <option value="fashion">Fashion</option>
        <option value="food">Food</option>
        <option value="culture">Culture</option>
        <option value="travel">Travel</option>
        <option value="coding">Coding</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt='' height={16} width={16}/>
        </button>
        {open && (
          <div className={styles.add}>
            <input type="file" id="image" onChange={(e)=> setFile(e.target.files[0])}/>
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt='' height={16} width={16}/>
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt='' height={16} width={16}/>
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt='' height={16} width={16}/>
            </button>
          </div>
        )}

        <ReactQuill 
          className={styles.textArea} 
          theme="bubble" 
          value={value} 
          onChange={setValue} 
          placeholder='Tell your story...'
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </div>
  )
}

export default WritePage
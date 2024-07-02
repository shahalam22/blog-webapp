import React from 'react'
import styles from './categoryList.module.css'
import Link from 'next/link'
import Image from 'next/image'


const getData = async () => {
  // const res = await fetch("http:localhost:3000/api/categories", {
  const res = await fetch("https://dailydev-blog-saa21.netlify.app/api/categories", {
    cache: "no-store"
  });

  if(!res.ok){
    throw new Error("Failed to load Category")
  }

  return res.json()
};


const CategoryList = async () => {
  const data = await getData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link id={item._id} href="/blog?cat=style" className={`${styles.category} ${styles[item.slug]}`}>
            {item.img && (<Image
              src={item.img}
              alt=''
              width={32}
              height={32}
              className={styles.image}
            />)}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
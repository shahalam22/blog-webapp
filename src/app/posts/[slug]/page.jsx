import React from 'react'
import styles from './singlePage.module.css'
import Image from 'next/image'
import Menu from '@/components/menu/Menu'
import Comments from '@/components/comments/Comments'

const getData = async (slug) => {
    const res = await fetch(
        // `http://localhost:3000/api/posts/${slug}`,
        `https://golden-raindrop-64d608.netlify.app/api/posts/${slug}`,
        {
            cache: "no-store",
        }
    );

    if(!res.ok){
        throw new Error("Failed to get Single Post");
    }

    return res.json();
};

const SinglePage = async ({params}) => {
    const { slug } = params;
    const data = await getData(slug);

  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>
                    {data?.title}
                </h1>
                <div className={styles.user}>
                    {data?.user?.img && (<div className={styles.userImageContainer}>
                        <Image src={data.user.image} alt='' fill className={styles.avatar}/>
                    </div>)}
                    <div className={styles.userTextContainer}>
                        <span className={styles.username}>{data?.user?.name}</span>
                        <span className={styles.date}>11.12.2024</span>
                    </div>
                </div>
            </div>
            {data?.img && (<div className={styles.imageContainer}>
                <Image src={data.img} alt='' fill className={styles.image}/>
            </div>)}
        </div>
        <div className={styles.content}>
            <div className={styles.post}>
                <div className={styles.description}>
                    {data?.desc}
                </div>
                <div className={styles.comments}>
                    <Comments postSlug={slug}/>
                </div>
            </div>
            <Menu/>
        </div>
    </div>
  )
}

export default SinglePage
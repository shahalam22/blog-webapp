"use client";

import React, { useEffect } from 'react'
import styles from './loginPage.module.css'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

function LoginPage() {
    const {data, status} = useSession()
    // console.log(data);
    const router = useRouter()

    if(status === "loading"){
        return (
            <div className={styles.loading}>
                Loading...
            </div>
        )
    }

    if(status === "authenticated"){
        // console.log(data);
        router.push("/");
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.socialButton} onClick={() => signIn("google")}>Sign in with Google</div>
            <div className={styles.socialButton}>Sign in with Github</div>
            <div className={styles.socialButton}>Sign in with Facebook</div>
        </div>
    </div>
  )
}

export default LoginPage
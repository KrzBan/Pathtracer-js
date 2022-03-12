import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pathtracer</title>
        <meta name="description" content="Interactive path tracer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>PathTracer!</a>
        </h1>

        <div className={styles.grid}>
          <a className={styles.card}>
            <h2>Overlook &rarr;</h2>
            <p>What's in the project?</p>
          </a>

          <a className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js!</p>
          </a>

          <a className={styles.card}>
            <h2>Canvas &rarr;</h2>
            <p>Add editable space and some interactive buttons!</p>
          </a>

          <a className={styles.card}>
            <h2>Trace &rarr;</h2>
            <p>Finally, add pathtracing algorithms!</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a>
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/Logo.png" alt="K.Banski Logo" width={72} height={24} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

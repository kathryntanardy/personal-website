import styles from './HomePage.module.css'

function HomePage() {
    return (
        <>

            <main className={styles.home}>
                <section className={styles.intro} aria-labelledby="intro-title">
                    <p className={styles.eyebrow}>Kathryn Tanardy</p>
                    <h1 id="intro-title">A personal website, gently taking shape.</h1>
                    <p className={styles.body}>
                        A place for selected work, notes, experiments, and the threads worth
                        keeping close.
                    </p>
                </section>
            </main>
        </>

    )
}

export default HomePage

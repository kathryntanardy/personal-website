import { useState } from 'react'
import Folder from '../../components/ui/Folder/Folder'
import TrashBin from '../../components/ui/TrashBin/TrashBin'
import styles from './HomePage.module.css'

const desktopFolders = [
    {
        id: 'me',
        title: 'me.jpg',
        imageSrc: '/desktopImages/image1.jpg',
        width: 'clamp(200px, 25vw, 350px)',
        position: { left: '8vw', top: '7vh', zIndex: 1 },
    },
    {
        id: 'fall',
        title: 'fall.jpg',
        imageSrc: '/desktopImages/image2.jpg',
        width: 'clamp(170px, 12vw, 350px)',
        position: { left: '40vw', top: '30vh', zIndex: 1 },
    },
    {
        id: 'cheesecake',
        title: 'cheesecake.jpg',
        imageSrc: '/desktopImages/image3.jpg',
        width: 'clamp(180px, 12vw, 240px)',
        position: { left: '8vw', top: '50vh', zIndex: 2 },
    },
    {
        id: 'strawberry',
        title: 'strawberry.jpg',
        imageSrc: '/desktopImages/image4.jpg',
        width: 'clamp(200px, 17vw, 350px)',
        position: { left: '61vw', top: '50vh', zIndex: 3 },
    },
    {
        id: 'matcha',
        title: 'matcha.jpg',
        imageSrc: '/desktopImages/image5.jpg',
        width: 'clamp(200px, 13vw, 350px)',
        position: { left: '75vw', top: '20vh', zIndex: 4 },
    },
]

function HomePage() {
    const [openFolderIds, setOpenFolderIds] = useState(() => desktopFolders.map((folder) => folder.id))
    const [isTrashOpen, setIsTrashOpen] = useState(false)

    const openFolders = desktopFolders.filter((folder) => openFolderIds.includes(folder.id))
    const trashedFolders = desktopFolders.filter((folder) => !openFolderIds.includes(folder.id))

    function closeFolder(folderId: string) {
        setOpenFolderIds((currentIds) => currentIds.filter((id) => id !== folderId))
    }

    function restoreFolder(folderId: string) {
        setOpenFolderIds((currentIds) => [...currentIds, folderId])
    }

    return (
        <main className={styles.home}>
            <section className={styles.desktop} aria-label="Photo desktop">


                {openFolders.map((folder) => (
                    <Folder
                        key={folder.id}
                        imageSrc={folder.imageSrc}
                        onClose={() => closeFolder(folder.id)}
                        position={folder.position}
                        width={folder.width}
                    />
                ))}

                <TrashBin
                    isOpen={isTrashOpen}
                    items={trashedFolders}
                    onRestore={restoreFolder}
                    onToggle={() => setIsTrashOpen((current) => !current)}
                />
            </section>
        </main>
    )
}

export default HomePage

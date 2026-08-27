import { useState } from 'react'
import Folder from '../../components/ui/Folder/Folder'
import TrashBin from '../../components/ui/TrashBin/TrashBin'
import AboutPage from '../AboutPage/AboutPage'
import PortfolioPage from '../PortfolioPage/PortfolioPage'
import styles from './HomePage.module.css'

const desktopFolders = [
    {
        id: 'chiro',
        title: 'chiro.jpg',
        imageSrc: '/desktop/image1.jpg',
        width: 'clamp(200px, 25vw, 350px)',
        position: { left: '8vw', top: '7vh', zIndex: 1 },
    },
    {
        id: 'fall',
        title: 'fall.jpg',
        imageSrc: '/desktop/image2.jpg',
        width: 'clamp(170px, 12vw, 350px)',
        position: { left: '45vw', top: '30vh', zIndex: 1 },
    },
    {
        id: 'cheesecake',
        title: 'cheesecake.jpg',
        imageSrc: '/desktop/image3.jpg',
        width: 'clamp(180px, 12vw, 240px)',
        position: { left: '8vw', top: '50vh', zIndex: 2 },
    },
    {
        id: 'strawberry',
        title: 'strawberry.jpg',
        imageSrc: '/desktop/image4.jpg',
        width: 'clamp(200px, 17vw, 350px)',
        position: { left: '61vw', top: '50vh', zIndex: 3 },
    },
    {
        id: 'matcha',
        title: 'matcha.jpg',
        imageSrc: '/desktop/image5.jpg',
        width: 'clamp(200px, 13vw, 350px)',
        position: { left: '75vw', top: '20vh', zIndex: 4 },
    },
    {
        id: 'ariana',
        title: 'ariana.jpg',
        imageSrc: '/desktop/image6.jpg',
        width: 'clamp(130px, 15vw, 220px)',
        position: { left: '28vw', top: '38vh', zIndex: 5 },
    },
    {
        id: 'video1',
        title: 'video1.mov',
        imageSrc: '/desktop/video1.m4v',
        mediaType: 'video' as const,
        width: 'clamp(150px, 18vw, 300px)',
        position: { left: '58vw', top: '10vh', zIndex: 6 },
    },
]

const initialFolderLayers = desktopFolders.reduce<Record<string, number>>((layers, folder) => {
    layers[folder.id] = folder.position.zIndex ?? 1
    return layers
}, {})

const initialTopLayer = Math.max(...Object.values(initialFolderLayers))

function HomePage() {
    const [openFolderIds, setOpenFolderIds] = useState(() => desktopFolders.map((folder) => folder.id))
    const [folderLayers, setFolderLayers] = useState(initialFolderLayers)
    const [topLayer, setTopLayer] = useState(initialTopLayer)
    const [isTrashOpen, setIsTrashOpen] = useState(false)

    const openFolders = desktopFolders.filter((folder) => openFolderIds.includes(folder.id))
    const trashedFolders = desktopFolders.filter((folder) => !openFolderIds.includes(folder.id))

    function closeFolder(folderId: string) {
        setOpenFolderIds((currentIds) => currentIds.filter((id) => id !== folderId))
    }

    function restoreFolder(folderId: string) {
        setOpenFolderIds((currentIds) => [...currentIds, folderId])
    }

    function bringFolderToFront(folderId: string) {
        const nextTopLayer = topLayer + 1

        setTopLayer(nextTopLayer)
        setFolderLayers((currentLayers) => ({
            ...currentLayers,
            [folderId]: nextTopLayer,
        }))
    }

    return (
        <main className={styles.home}>
            <section id="home" className={styles.desktop} aria-label="Photo desktop">
                {openFolders.map((folder) => (
                    <Folder
                        key={folder.id}
                        imageSrc={folder.imageSrc}
                        mediaType={folder.mediaType}
                        onClose={() => closeFolder(folder.id)}
                        onSelect={() => bringFolderToFront(folder.id)}
                        position={folder.position}
                        width={folder.width}
                        zIndex={folderLayers[folder.id]}
                    />
                ))}

                <TrashBin
                    isOpen={isTrashOpen}
                    items={trashedFolders}
                    onRestore={restoreFolder}
                    onToggle={() => setIsTrashOpen((current) => !current)}
                />
            </section>
            <AboutPage />
            <PortfolioPage />
        </main>
    )
}

export default HomePage

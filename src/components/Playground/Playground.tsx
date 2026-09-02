import { useState } from 'react'
import ChatBox from '../ui/ChatBox/ChatBox'
import Folder from '../ui/Folder/Folder'
import TrashBin from '../ui/TrashBin/TrashBin'
import styles from './Playground.module.css'

const desktopFolders = [
  {
    id: 'chiro',
    title: 'chiro.jpg',
    imageSrc: '/desktop/image1.jpg',
    width: 'clamp(220px, 20vw, 330px)',
    position: { left: '6vw', top: '10vh', zIndex: 5 },
  },
  {
    id: 'cheesecake',
    title: 'cheesecake.jpg',
    imageSrc: '/desktop/image3.jpg',
    width: 'clamp(155px, 14vw, 250px)',
    position: { left: '5vw', top: '52vh', zIndex: 4 },
  },
  {
    id: 'strawberry',
    title: 'strawberry.jpg',
    imageSrc: '/desktop/image4.jpg',
    width: 'clamp(190px, 18vw, 320px)',
    position: { left: 'min(41vw, calc(100vw - 650px))', top: '49vh', zIndex: 3 },
  },
  {
    id: 'matcha',
    title: 'matcha.jpg',
    imageSrc: '/desktop/image5.jpg',
    width: 'clamp(200px, 18vw, 300px)',
    position: { left: 'min(48vw, calc(100vw - 650px))', top: '17vh', zIndex: 2 },
  },
  {
    id: 'ariana',
    title: 'ariana.jpg',
    imageSrc: '/desktop/image6.jpg',
    width: 'clamp(110px, 12vw, 175px)',
    position: { left: '22vw', top: '37vh', zIndex: 7 },
  },
  {
    id: 'video1',
    title: 'video1.mov',
    imageSrc: '/desktop/video1.m4v',
    mediaType: 'video' as const,
    width: 'clamp(145px, 17vw, 285px)',
    position: { left: '30vw', top: '10vh', zIndex: 1 },
  },
]

const initialFolderLayers = desktopFolders.reduce<Record<string, number>>((layers, folder) => {
  layers[folder.id] = folder.position.zIndex ?? 1
  return layers
}, {})

const initialTopLayer = Math.max(...Object.values(initialFolderLayers))

function Playground() {
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
    <section className={styles.playground} aria-label="Photo playground">
      <div className={styles.chatBoxLayer}>
        <ChatBox />
      </div>

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
  )
}

export default Playground

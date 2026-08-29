import type { CSSProperties } from 'react'
import styles from './Slider.module.css'

const sliderOptions = ['experience', 'projects', 'tech stack'] as const

export type SliderOption = (typeof sliderOptions)[number]

type SliderProps = {
  selectedOption: SliderOption
  onSelect: (option: SliderOption) => void
}

function Slider({ selectedOption, onSelect }: SliderProps) {
  const selectedIndex = sliderOptions.indexOf(selectedOption)

  return (
    <div
      className={styles.slider}
      role="tablist"
      aria-label="Portfolio sections"
      style={{ '--active-index': selectedIndex } as CSSProperties}
    >
      <span className={styles.activeIndicator} aria-hidden="true" />

      {sliderOptions.map((option) => (
        <button
          className={styles.option}
          type="button"
          role="tab"
          aria-selected={selectedOption === option}
          key={option}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Slider

"use client"
import { useEffect, useRef } from "react"
import { ProgressLine, ProgressContainer, ProgressCircle } from "./styles"
import Video from "../Videos"
import Features from "../Features"
import Plans from "../Plans"


export default function ScrollLine() {
  const lineRef = useRef(null)

useEffect(() => {
  let currentHeight = 0

  const updateLine = () => {
    const targetHeight = window.scrollY / 1.1

    // Interpolação suave
    currentHeight += (targetHeight - currentHeight) * 0.1

    if (lineRef.current) {
      lineRef.current.style.height = `${currentHeight}px`
    }

    requestAnimationFrame(updateLine)
  }

  updateLine()

  return () => cancelAnimationFrame(updateLine)
}, [])



  return( 
     <ProgressContainer>
      <ProgressCircle/>
      <ProgressLine ref={lineRef} />
      <Video/>
      <Features/>
      <Plans/>
    </ProgressContainer>
  )
}


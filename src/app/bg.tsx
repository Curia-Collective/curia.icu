'use client'

import randomColor from 'randomcolor'
import React, { useEffect, useRef } from 'react'

export default function Bg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resizeCanvas() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function drawCodaSymbol(x: number, y: number, size: number, color: string) {
      if (!ctx) return
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(size / 100, size / 100)

      // Draw vertical oval
      ctx.beginPath()
      ctx.ellipse(50, 50, 30, 50, 0, 0, Math.PI * 2)
      ctx.strokeStyle = color
      ctx.lineWidth = 10
      ctx.stroke()

      // Draw extended cross
      ctx.beginPath()
      ctx.moveTo(50, -30)
      ctx.lineTo(50, 130)
      ctx.moveTo(0, 50)
      ctx.lineTo(100, 50)
      ctx.strokeStyle = color
      ctx.lineWidth = 4
      ctx.stroke()

      ctx.restore()
    }

    let symbols: {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
    }[] = []

    function createSymbol() {
      if (!canvas) return
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = 20 + Math.random() * 100
      const color = randomColor({ luminosity: 'bright' }) 
      const speedX = (Math.random() - 0.5) * 4
      const speedY = (Math.random() - 0.5) * 4
      symbols.push({ x, y, size, color, speedX, speedY })
    }

    function animate() {
      resizeCanvas()
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      for (let x = 0; x <= canvas.width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y <= canvas.height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw and animate symbols
      symbols.forEach((symbol) => {
        drawCodaSymbol(symbol.x, symbol.y, symbol.size, symbol.color)
        symbol.x += symbol.speedX
        symbol.y += symbol.speedY

        // Bounce symbols off the edges
        if (symbol.x <= 0 || symbol.x >= canvas.width) {
          symbol.speedX *= -1
        }
        if (symbol.y <= 0 || symbol.y >= canvas.height) {
          symbol.speedY *= -1
        }
      })

      // Create new symbols
      if (symbols.length < 50) {
        createSymbol()
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resizeCanvas, false)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed left-0 top-0 -z-10 h-full w-full"
    />
  )
}

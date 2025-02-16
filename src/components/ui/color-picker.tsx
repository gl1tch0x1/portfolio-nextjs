'use client'

import { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ColorPickerProps {
  name: string
  defaultValue?: string
  className?: string
  onChange?: (value: string) => void
}

const presetColors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFA500', // Orange
  '#800080', // Purple
  '#008080', // Teal
  '#FFC0CB', // Pink
]

export function ColorPicker({ name, defaultValue = '#000000', className, onChange }: ColorPickerProps) {
  const [color, setColor] = useState(defaultValue)

  useEffect(() => {
    setColor(defaultValue)
  }, [defaultValue])

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    onChange?.(newColor)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-full justify-start', className)}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: color }}
            />
            <input
              type="hidden"
              name={name}
              value={color}
            />
            <span className="text-xs">{color.toUpperCase()}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Custom Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-8 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Preset Colors</label>
            <div className="grid grid-cols-6 gap-2 mt-1">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className={cn(
                    'w-8 h-8 rounded-full border',
                    color === presetColor && 'ring-2 ring-primary ring-offset-2'
                  )}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handleColorChange(presetColor)}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 
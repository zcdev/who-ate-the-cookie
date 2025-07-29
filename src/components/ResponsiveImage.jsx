// Renders a responsive image with WebP fallback and 1x/2x resolution switching
export default function ResponsiveImage({
  fileName,          // e.g., "icon_cookie"
  alt = "",          // Accessible alt text
  width = 100,       // Rendered width in pixels
  height = 100,      // Rendered height in pixels
  className = "",    // Optional CSS class
  path = "./assets/icons"  // Folder path for image assets
}) {
  const webp = `${path}/${fileName}.webp`
  const png1x = `${path}/${fileName}.png`
  const png2x = `${path}/${fileName}@2x.png`

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={webp}
      />
      <img
        src={png1x}
        srcSet={`${png1x} 1x, ${png2x} 2x`}
        width={width}
        height={height}
        className={className}
        alt={alt}
      />
    </picture>
  )
}

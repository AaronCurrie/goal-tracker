import style from "./image.module.css"

export default function Image({src, alt}: {src: string, alt: string}) {
    return (
        <img className={style.image} src={src} alt={alt} />
    )
}
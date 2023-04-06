// ** React Import

import { Container, Row } from 'reactstrap'


export interface ImageGalleryItem {
    src: string
    alt?: string
}

export interface ImageGalleryProps {
    images: ImageGalleryItem[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
    return (
        <Container className="image-gallery">
            <Row className="container my-2">
            { images.map(image => (
                <img key={image.src} src={image.src} alt={image.alt || 'Image Gallery Item'} width={120} className="item"/>
            ))}
            </Row>
        </Container>
    )
}


export default ImageGallery
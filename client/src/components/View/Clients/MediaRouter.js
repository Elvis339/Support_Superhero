import React from 'react';
import Image from './components/Image';
import Video from './components/Video';

const mediaRouter = props => {
    let mimetype = props.mimetype.split('/')[0]
    switch(mimetype) {
        case 'video':
            return <Video
                width={props.width}
                height={props.height}
                src={props.src}
                url={`view/${props.url}`}
            />
        default:
            return <Image 
                src={props.src}
                url={`view/${props.url}`}
            />
    }
};

export default mediaRouter;
import React, { Fragment } from 'react';
import Resource from '../../../controllers/Resource/Resource';
import Frame from '../../Layout/Frame/Frame';
import Centered from '../../Layout/Centered/Centered';
import CenterHorizontally from '../../Layout/CenterHorizontaly/CenterHorizontaly';
import Spinner from '../../Layout/Spinner/Spinner';
import MediaRouter from '../Clients/MediaRouter';
import Reactions from '../../../controllers/ReactionContainer/ReactionContainer';

const clientView = props => {
    let URI = props.location.pathname.split('/')[3]
    return (
        <Frame row={false}>
            <Centered height="50vh">
                <Resource
                    path={`/api/v1/document-file?id=${URI}`}
                    render={
                        data => {
                            if (!data.loading) {
                                return data.payload.map((file, index) => (
                                    <Fragment key={index}>
                                        <MediaRouter
                                            mimetype={file.mimetype}
                                            src={file.path}
                                            width="500"
                                            height="500"
                                        />
                                    </Fragment>
                                ))
                            }
                            return (
                                <Spinner animation='grow' size='lg' />
                            )
                        }
                    }
                />
            </Centered>
            <CenterHorizontally>
                <Reactions URI={URI} />
            </CenterHorizontally>
        </Frame>
    )
}

export default clientView;
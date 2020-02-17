import React, { Fragment } from 'react';
import Frame from '../../Layout/Frame/Frame';
import CeneterHorizontally from '../../Layout/CenterHorizontaly/CenterHorizontaly';
import Resource from '../../../controllers/Resource/Resource';
import Spinner from '../../Layout/Spinner/Spinner';
import MediaRouter from '../Clients/MediaRouter';

const clientView = props => {
    let URI = props.location.pathname.split('/')[3]
    return (
        <Frame row={false}>
            <CeneterHorizontally>
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
            </CeneterHorizontally>
        </Frame>
    )
}

export default clientView;
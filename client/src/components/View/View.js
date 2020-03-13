import React, { Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Resource from '../../containers/Resource/Resource';
import Navigation from '../Layout/Navigation/Navigation';
import Frame from '../Layout/Frame/Frame';
import CenterHorizontally from '../Layout/CenterHorizontaly/CenterHorizontaly';
import Tooltip from '../Layout/Tooltip/Tooltip';
import MediaRouter from './Clients/MediaRouter';

// import Edit from '../Edit/Edit';
import Delete from '../Layout/Delete/Delete';

const view = props => {
    let URI = props.location.pathname.split('/')[2]
    return (
        <Fragment>
            <Navigation show={false} />
            <Frame row={false}>
                <Resource
                    path={`/api/v1/document?id=${URI}`}
                    render={
                        data => {
                            return (
                                <Fragment>
                                    <div className='float-right'>
                                        <Delete path={`/api/v1/document?id=${URI}`} />
                                        {/* <Edit path={`/document/edit/${URI}`} /> */}
                                    </div>
                                    <h1 className="text-center my-2">
                                        {data.payload.title}
                                    </h1>
                                    <div>
                                        {ReactHtmlParser(data.payload.body)}
                                    </div>
                                    {data.payload.files.map((file, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <MediaRouter
                                                    mimetype={file.mimetype}
                                                    src={file.path}
                                                />
                                                <CenterHorizontally>
                                                    <Tooltip
                                                        body="Share the url with clients"
                                                        url={`view/${file._id}`}
                                                    />
                                                </CenterHorizontally>
                                            </Fragment>
                                        )
                                    })}
                                </Fragment>
                            )
                        }
                    }
                />
            </Frame>
        </Fragment>
    )
}

export default view
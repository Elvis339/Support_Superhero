import React, { Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Resource from '../../controllers/Resource/Resource';
import Navigation from '../Layout/Navigation/Navigation';
import { Container } from 'react-bootstrap';

const view = props => (
    <Fragment>
        <Navigation show={false} />
        <Container>
            <Resource
                path={`/api/v1/document?id=${props.location.pathname.split('/')[2]}`}
                render={
                    data => {
                        let extension = ''
                        let src = ''
                        data.payload.files.forEach(file => {
                            extension = file.mimetype.split('/')[1]
                            return src = `${file.path}.${extension}`
                        })
                        return (
                            <Fragment>
                                <h1 className="text-center my-2">
                                    {data.payload.title}
                                </h1>
                                <div>
                                    {ReactHtmlParser(data.payload.body)}
                                    <img src={src} />
                                </div>
                            </Fragment>
                        )
                    }
                }
            />
        </Container>
    </Fragment>
)

export default view
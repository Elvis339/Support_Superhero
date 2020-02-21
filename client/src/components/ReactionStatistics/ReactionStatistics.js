import React, { Fragment } from 'react'
import Resource from '../../containers/Resource/Resource';
import Navigation from '../Layout/Navigation/Navigation';
import Frame from '../Layout/Frame/Frame';

const reactionStatistics = props => {

    return (
        <Fragment>
            <Navigation handleClick={e => this.handler(e)}
                show={true} />
            <Frame row={true}>
                <Resource
                    path={'/api/v1/reactions'}
                    render={
                        data => {
                            return data.payload.map((val, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div>
                                            Hello
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                    }
                />
            </Frame>
        </Fragment>
    )
}

export default reactionStatistics;
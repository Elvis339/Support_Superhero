import React, { Fragment } from 'react';
import Resource from '../../controllers/Resource/Resource';

import ActivityHeader from './Layout/Header/ActivityHeader';

const news = props => {
    return (
        <Fragment>
            <ActivityHeader />
            <Resource
                path={`/api/v1/news`}
                render={
                    data => {
                        return data.payload.map((val, index) => {
                            return (
                                <Fragment key={index}>
                                    {val.body}
                                </Fragment>
                            )
                        })
                    }
                }
            />
        </Fragment>
    )
};

export default news;
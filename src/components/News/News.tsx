import React, {FC} from 'react'
import classes from './News.module.css';

type PropsType ={}

const News: FC<PropsType> = () => {
    return (
        <div className={classes.item}>
            News
        </div>
    )
}

export default News;

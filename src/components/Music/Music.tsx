import React, {FC} from 'react'
import classes from './Music.module.css';

type PropsType = {}

const Music: FC<PropsType> = () => {
    return (
        <div className={classes.item}>
            Music
        </div>
    )
}

export default Music;

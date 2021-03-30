import React, {FC} from 'react';
import classes from './Loader.module.css'
import giphy from './giphy.gif'

type PropsType = {}

const Loader: FC<PropsType> = () => {
    return (
        <div>
            <img src={giphy} className={classes.gifka} alt='Текст'/>
        </div>
    )
}

export default Loader;
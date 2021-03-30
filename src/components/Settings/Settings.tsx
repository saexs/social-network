import React, {FC} from 'react'
import classes from './Settings.module.css';

type PropsType = {}

const Settings: FC<PropsType> = () => {
    return (
        <div className={classes.item}>
            Settings
        </div>
    );
}

export default Settings;
import React, {FC} from 'react'
import { NavLink } from 'react-router-dom';
import classes from './../Dialogs.module.scss';

type PropsType = {
  id: number,
  name: string
}

const DialogItem: FC<PropsType> = ({id, name}) => {
  return (
    <div className={classes.dialogsItem}> 
      <NavLink activeClassName={classes.dialogsActive} className={classes.dialogsItemLink} to={`/dialogs/${id}`}> {name} </NavLink> 
    </div>
  );
}

export default DialogItem;
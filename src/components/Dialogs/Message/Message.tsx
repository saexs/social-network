import React, {FC} from 'react'
import classes from './../Dialogs.module.scss';
type PropsType = {
  message: string
}

const Message: FC<PropsType> = ({message}) => {
  return (
    <div className={classes.messageOuter}>
      <div className={classes.messageInner}> {message} </div>
    </div>
  )
}

export default Message;
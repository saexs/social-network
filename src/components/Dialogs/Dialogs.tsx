import React, {FC} from 'react'
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import classes from './Dialogs.module.scss';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormControls/FormsControls';
import { maxLengthCreator, requiredField } from '../../redux/utils/validators/validators';
import { useDispatch, useSelector } from 'react-redux'
import { addNewMessage, messagePageType } from '../../redux/messageReducer';
import { WithAuthRedirect } from '../../HOC/withAuthRedirect';
import { RootState } from '../../redux/redaxstore';

type PropsType = {}

const Dialogs: FC<PropsType> = WithAuthRedirect(() => {

  const dispatch = useDispatch()

  const messagesPage = useSelector((state: RootState): messagePageType => state.messagesPage)

  let dialogElements = messagesPage.dialogs.map((item) => {
    return (<DialogItem name={item.name} id={item.id} />);
  });

  let messagesElements = messagesPage.messages.map((itemMessage) => {
    return (<Message message={itemMessage.message} />);
  })

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogElements}
      </div>
      <div className={classes.messageArea}>
        <div className={classes.dialogsMessages}>
          {messagesElements}
        </div>
        <AddMessageFormRedux onSubmit={(e: any) => {dispatch(addNewMessage(e.message)); e.message = ''}}/>
      </div>
    </div>
  );
})

const maxLength = maxLengthCreator(30)

const AddMessageForm: FC<InjectedFormProps<string>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div >
        <Field className={classes.messageTextarea} placeholder='Your message' name='message' component={Textarea}
        validate={[requiredField, maxLength]}/>
      </div>
      <div>
        <button className={classes.messageButton} id='addMessageButton'>Add Message</button>
        <label className={classes.messageLabel} htmlFor='addMessageButton'>
          <span className={classes.messageLabelText}>
            Add Message
          </span>
        </label>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm<string>({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;
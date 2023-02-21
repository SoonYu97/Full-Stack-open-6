import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const notificaiton = useNotificationValue()
  if (notificaiton === '') return null

  return (
    <div style={style}>
      {notificaiton}
    </div>
  )
}

export default Notification

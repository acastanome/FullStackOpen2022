import { useSelector } from 'react-redux'
// import { createNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(({ notifications }) => notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  if (notification.length > 0) {
    return <div style={style}>{notification}</div>
  }
}

export default Notification

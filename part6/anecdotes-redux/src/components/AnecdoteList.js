import { useSelector, useDispatch } from 'react-redux'
import { vote } from './../reducers/anecdoteReducer'
import {
  createNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filters = useSelector(({ filters }) => filters)

  var sortedList = [...anecdotes]
  sortedList.sort((a, b) => b.votes - a.votes)

  if (filters.length > 0) {
    const filteredList = sortedList.filter((a) =>
      a.content.toLowerCase().includes(filters.toLowerCase())
    )
    sortedList = filteredList
  }
  sortedList.sort((a, b) => b.votes - a.votes)
  return (
    <div>
      {sortedList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(vote(anecdote.id))
                dispatch(createNotification(`you voted '${anecdote.content}'`))
                setTimeout(() => {
                  dispatch(removeNotification(null))
                }, 5000)
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList

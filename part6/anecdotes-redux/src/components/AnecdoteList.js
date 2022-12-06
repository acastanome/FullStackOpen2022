import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
                dispatch(voteAnecdote(anecdote))
                dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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

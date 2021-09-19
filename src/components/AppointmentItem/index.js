import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleFavorite} = props
  const {titleId, title, date, isStarred} = appointmentDetails

  const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickMakeFavorite = () => {
    toggleFavorite(titleId)
  }

  const star =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const filledStar =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const starImg = isStarred ? filledStar : star

  return (
    <li className="appointment-container">
      <div className="appointment-details">
        <p className="title">{title}</p>
        <p className="Date">{formatDate}</p>
      </div>
      <button
        type="button"
        onClick={onClickMakeFavorite}
        className="favotite-button"
        testId="star"
      >
        <img src={starImg} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem

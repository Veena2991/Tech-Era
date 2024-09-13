import {Component} from 'react'
import TailSpin from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    itemDetails: {},
  }

  componentDidMount = () => {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(updatedData)
      this.setState({
        itemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  successView = () => {
    const {itemDetails} = this.state
    const {description, name, imageUrl} = itemDetails
    return (
      <div className="itemDetails">
        <div className="content">
          <img src={imageUrl} alt={name} className="image" />

          <div>
            <h1 className="name">{name}</h1>
            <p className="des">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-content">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
      </div>
      <h1 className="error">Oops! Something Went Wrong</h1>
      <p className="err-des">
        We cannot seem to find the page you are looking for.
      </p>
      <div>
        <button
          type="button"
          className="button"
          onClick={this.getCourseDetails}
        >
          Retry
        </button>
      </div>
    </div>
  )

  loader = () => (
    <div data-testid="loader" className="spinner">
      <TailSpin
        height="80"
        width="80"
        color="#4fa940"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )

  checkApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loader()

      default:
        return null
    }
  }

  render() {
    return <div>{this.checkApiStatus()}</div>
  }
}

export default CourseItemDetails

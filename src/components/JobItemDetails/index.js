import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {IoShareOutline} from 'react-icons/io5'

import {MdLocationOn} from 'react-icons/md'

import {FaSuitcase, FaRegStar} from 'react-icons/fa'

import Header from '../Header'

import SkillData from '../SkillData'

import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const newApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: [],
    similarJobsDetails: [],
    lifeAtCompDetails: [],
    skillsDetails: [],
    newApiStatus: newApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemData()
  }

  getFormattedData = data => ({
    id: data.job_details.id,
    companyLogoUrl: data.job_details.company_logo_url,
    companyWebsiteUrl: data.job_details.company_website_url,
    employmentType: data.job_details.employment_type,
    jobDescription: data.job_details.job_description,
    location: data.job_details.location,
    packagePerAnnum: data.job_details.package_per_annum,
    rating: data.job_details.rating,
    title: data.job_details.title,
  })

  getSimilarFormattedData = data => ({
    id: data.id,
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      newApiStatus: newApiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data)
      const skillsData = data.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const similarJobs = data.similar_jobs.map(eachItem =>
        this.getSimilarFormattedData(eachItem),
      )

      this.setState({
        jobItemDetails: updatedData,
        similarJobsDetails: similarJobs,
        lifeAtCompDetails: lifeAtCompany,
        skillsDetails: skillsData,
        newApiStatus: newApiStatusConstants.success,
      })
    } else {
      this.setState({
        newApiStatus: newApiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="job-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        className="error-view-image"
      />
      <h1 className="job-not-found-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <Link to="/jobs">
        <button
          type="button"
          className="failure-button"
          onClick={this.goToJobDetails}
        >
          Retry
        </button>
      </Link>
    </div>
  )

  renderLoadingView = () => (
    <div className="loaderEl" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {
      jobItemDetails,
      skillsDetails,
      similarJobsDetails,
      lifeAtCompDetails,
    } = this.state

    const {
      companyWebsiteUrl,
      title,
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobItemDetails
    return (
      <div className="job-details-main-container">
        <div className="main-job-card1">
          <div className="top-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-image"
            />
            <li className="title-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <FaRegStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </li>
          </div>
          <div className="second-container">
            <li className="employmentType-container">
              <li className="container">
                <MdLocationOn className="icon" />
                <p className="location">{location}</p>
              </li>
              <li className="container">
                <FaSuitcase className="icon" />
                <p className="location">{employmentType}</p>
              </li>
            </li>
            <div>
              <p className="location">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <li className="desc-container">
            <div className="web-link-container">
              <h1 className="desc-heading">Description</h1>
              <div className="visit-container">
                <a href={companyWebsiteUrl} className="anchorEl">
                  Visit
                </a>
                <IoShareOutline className="visit-icon" />
              </div>
            </div>

            <p className="desc-para">{jobDescription}</p>
          </li>
          <li className="skill-container">
            <h1 className="skill-heading">Skills</h1>
            <ul className="skill-ul-container">
              {skillsDetails.map(eachSkill => (
                <SkillData Item={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
          </li>
          <li className="list-item">
            <h1 className="lat-heading">Life at Company</h1>
            <div className="lat-desc-container">
              <p className="lat-desc">{lifeAtCompDetails.description}</p>
              <img
                src={lifeAtCompDetails.imageUrl}
                alt="life at company"
                className="lat-image"
              />
            </div>
          </li>
        </div>
        <li className="similar-container">
          <h1 className="similar-job-heading">Similar Jobs</h1>
          <ul className="similar-job-list">
            {similarJobsDetails.map(eachSimilarJob => (
              <SimilarJobItem
                similarItem={eachSimilarJob}
                key={eachSimilarJob.id}
              />
            ))}
          </ul>
        </li>
      </div>
    )
  }

  renderJobDetails = () => {
    const {newApiStatus} = this.state

    switch (newApiStatus) {
      case newApiStatusConstants.success:
        return this.renderJobDetailsView()
      case newApiStatusConstants.failure:
        return this.renderFailureView()
      case newApiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails

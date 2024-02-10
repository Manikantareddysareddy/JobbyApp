import {Link} from 'react-router-dom'

import {MdLocationOn} from 'react-icons/md'

import {FaSuitcase, FaRegStar} from 'react-icons/fa'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobData

  return (
    <li className="main-job-card">
      <Link to={`jobs/${id}`} className="link-item">
        <div className="top-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-image"
          />
          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <FaRegStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="second-container">
          <div className="employmentType-container">
            <div className="container">
              <MdLocationOn className="icon" />
              <p className="location">{location}</p>
            </div>
            <div className="container">
              <FaSuitcase className="icon" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="location">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="desc-container">
          <h1 className="desc-heading">Description</h1>
          <p className="desc-para">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard

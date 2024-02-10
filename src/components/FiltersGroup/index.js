import './index.css'

const EmpTypesList = props => {
  const {empItem, getEmploymentType} = props
  const {label, employmentTypeId} = empItem

  const onSelectType = () => {
    getEmploymentType(employmentTypeId)
  }
  return (
    <li className="checkbox-container">
      <input type="checkbox" id={employmentTypeId} onChange={onSelectType} />
      <label htmlFor={employmentTypeId} className="checkbox-labelEl">
        {label}
      </label>
    </li>
  )
}

export default EmpTypesList

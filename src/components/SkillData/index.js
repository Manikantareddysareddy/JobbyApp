import './index.css'

const SkillData = props => {
  const {Item} = props
  const {imageUrl, name} = Item
  return (
    <li className="skill-list-item">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-para">{name}</p>
    </li>
  )
}

export default SkillData

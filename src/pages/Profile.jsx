import { useParams } from "react-router-dom"

const Profile = () => {
  const { profileId } = useParams();
  return (
    <div>Profile</div>
  )
}

export default Profile
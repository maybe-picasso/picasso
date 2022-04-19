import { PROFILE_CHARACTERS } from 'constants/index';
import './index.scss';

interface Props {
  index: number;
}

const ProfileAvatar = ({ index = 0 }: Props) => {
  return <div className="profile-avatar">{PROFILE_CHARACTERS[index]}</div>;
};

export default ProfileAvatar;

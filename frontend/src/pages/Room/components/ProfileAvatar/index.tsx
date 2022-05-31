import { PROFILE_CHARACTERS } from 'constants/index';
import './index.scss';

interface Props {
  index: number;
  size?: number;
}

const ProfileAvatar = ({ index = 0, size = 40 }: Props) => {
  return (
    <div className="profile-avatar" style={{ width: `${size}px`, fontSize: `${size}px` }}>
      {PROFILE_CHARACTERS[index]}
    </div>
  );
};

export default ProfileAvatar;

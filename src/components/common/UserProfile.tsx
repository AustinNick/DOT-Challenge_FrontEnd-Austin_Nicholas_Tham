import React from 'react';

interface UserProfileProps {
  name: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email }) => {
  const dummyProfilePictureUrl = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';

  return (
    <div className="flex items-center space-x-4 mx-4">
      <img
        src={dummyProfilePictureUrl} // Use profilePictureUrl if available, otherwise use dummy URL
        alt={`${name}'s profile`}
        className="w-10 h-10 object-cover rounded-full"
      />
      <div>
        <h4 className="text-md font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default UserProfile;

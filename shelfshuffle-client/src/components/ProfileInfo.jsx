const ProfileInfo = ({ user }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    );
  };
  
  export default ProfileInfo;
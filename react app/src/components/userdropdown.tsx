import React from 'react';

interface UserDropdownProps {
  user: { username: string; userId: string };
  isLoggedIn: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  return (
    <div className="dropdown-menu-nobs">
      <button className="button dropdown nav items">Hi, {user.username}</button>
      <div className="dropdown-content">
        <a className="navbar-item" href={`/users/profile/${user.userId}`}>Profile</a>
        <form action="/users/logout" method="post">
          <button className="navbar-item" type="submit">Log out</button>
        </form>
      </div>
    </div>
  );
};

export default UserDropdown;

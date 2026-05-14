import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className='flex justify-between'>
      <h1 className='text-2xl'>Strava Activity Mapper</h1>
      <Button>Log In</Button>
    </div>
  );
};

export default Header;
